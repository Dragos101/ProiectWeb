import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.development';
import { MigrationModel } from '../models/migration.model';
import { MigrationService } from '../services/migration.service';
import { Router } from '@angular/router';
import { FeatureCollection, Geometry } from 'geojson';

@Component({
  selector: 'app-migration-index',
  templateUrl: './migration-index.component.html',
  styleUrls: ['./migration-index.component.sass']
})

export class MigrationIndexComponent implements OnInit {
  map?: mapboxgl.Map
  migrations: MigrationModel[]
  filteredMigrations: MigrationModel[]
  showFilters: boolean = false
  categoryFilter: string = "All"
  seasonFilter: string = "All"

  constructor(private router: Router, private migrationService: MigrationService) {
    (mapboxgl as any).accessToken = environment.mapBoxApi
    this.migrations = []
    this.filteredMigrations = [...this.migrations]
  }

  toggleShowFilters(event: Event): void {
    this.showFilters = !this.showFilters
    event.preventDefault();
  }

  onEntityFilterChange(event: Event) {
    const selectedItem = event.target as HTMLSelectElement
    this.categoryFilter = selectedItem.value
    this.filterMigrations();
  }

  onSeasonFilterChange(event: Event) {
    const selectedItem = event.target as HTMLSelectElement
    this.seasonFilter = selectedItem.value
    this.filterMigrations();
  }

  filterMigrations() {
    if (this.categoryFilter === 'All' && this.seasonFilter === 'All'){
      this.filteredMigrations = this.migrations;
    }
    if (this.categoryFilter !== 'All' && this.seasonFilter === 'All') {
      this.filteredMigrations = this.migrations.filter((migration) => migration.Category === this.categoryFilter)
      this.filteredMigrations;
    }
    if (this.categoryFilter === 'All' && this.seasonFilter !== 'All') {
      this.filteredMigrations = this.migrations.filter((migration) => migration.Season === this.seasonFilter)
    }
    if (this.categoryFilter !== 'All' && this.seasonFilter !== 'All') {
      this.filteredMigrations = this.migrations.filter((migration) => migration.Season === this.seasonFilter && migration.Category === this.categoryFilter)
    }

    this.updateMapData()
  }

  ngOnInit(): void {

    this.migrationService.getMigrations().subscribe({
      next: (response) => {
        this.migrations = response
        this.filteredMigrations = this.migrations
        this.initializeMap();
      }
    })
  }

  initializeMap(): void {
    if (!this.map) {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 2,
        center: [-16.743686, 46.054594],
      });
    }

    this.map.on('load', () => {
      this.updateMapData(); // Initial map data update
    });
  }

  updateMapData(): void {
    if (this.map!.getSource('migrations')) {
      this.map!.removeLayer('migrations');
      this.map!.removeSource('migrations');
    }

    console.log(this.filteredMigrations)

    const migrationsGeoJSON: FeatureCollection<Geometry> = {
      type: 'FeatureCollection',
      features: this.filteredMigrations.map(migration => ({
        type: 'Feature',
        properties: {
          id: migration.Id,
          name: migration.Name,
          description: migration.Description,
          long: migration.Longitude,
          lat: migration.Latitude
        },
        geometry: {
          type: 'Point',
          coordinates: [migration.Longitude, migration.Latitude]
        }
      }))
    };

    this.map!.addSource('migrations', {
      type: 'geojson',
      data: migrationsGeoJSON
    });

    this.map!.addLayer({
      id: 'migrations',
      type: 'circle',
      source: 'migrations',
      paint: {
        'circle-radius': 8,
        'circle-color': '#ff5200'
      }
    });

    this.map!.on('click', 'migrations', (e) => {
      // Ensure that if the map is clicked on a feature, it will be processed
      if (e.features!.length > 0) {
        const feature = e.features![0];
        this.showPopup(feature);
      }
    });

    // Change the cursor to a pointer when hovering over points
    this.map!.on('mouseenter', 'migrations', () => {
      this.map!.getCanvas().style.cursor = 'pointer';
    });

    this.map!.on('mouseleave', 'migrations', () => {
      this.map!.getCanvas().style.cursor = '';
    });
  }

  showPopup(feature: mapboxgl.MapboxGeoJSONFeature): void {
    const { name, description, id, long, lat } = feature.properties!;

    // Ensure that if the map is clicked on a feature, it will fly to that point
    this.map!.flyTo({
      center: [long, lat]
    });

    const popupContent = `
      <div>
        <h3>${name}</h3>
        <p>${description.slice(0, 150)}...</p>
        <a href="/migration/${id}" id="showMoreBtn-${id}">Show More</a> <!-- Adjusted ID -->
      </div>
    `;

    // Create a popup and set its content
    const popup = new mapboxgl.Popup()
      .setLngLat([long, lat])
      .setHTML(popupContent)
      .addTo(this.map!)
      .on('open', () => { // Event listener for when the popup opens
        const showMoreBtn = document.querySelector(`#showMoreBtn-${id}`); // Use unique ID
        if (showMoreBtn) {
          showMoreBtn.addEventListener('click', (event) => {
            this.router.navigateByUrl(`/migration/${id}`);
            event.preventDefault();
          });
        }
      });


    // Find the newly added button in the popup and add click listener
    const popupElement = document.getElementById('showMoreBtn');
    if (popupElement) {
      popupElement.onclick = () => {
        this.router.navigateByUrl(`/migration/${id}`);
      };
    }
  }

  toMigration(event: Event, id: string) {
    this.router.navigateByUrl(`/migration/${id}`)
  }
}
