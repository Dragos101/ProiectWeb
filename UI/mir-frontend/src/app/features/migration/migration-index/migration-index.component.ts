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

    this.initializeMap()
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
      if (this.map && this.map.getSource('migrations')) {
        this.map.removeLayer('migrations');
        this.map.removeSource('migrations');
      }

      const migrationsGeoJSON: FeatureCollection<Geometry> = {
        type: 'FeatureCollection',
        features: this.filteredMigrations.map(migration => ({
          type: 'Feature',
          properties: {
            id: migration.Id,
            name: migration.Name,
            description: migration.Description,
            // Additional properties can go here
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
        type: 'circle', // or 'symbol' if you want to use custom icons
        source: 'migrations',
        layout: {},
        paint: {
          // Customize the appearance of the layer here
          'circle-radius': 8,
          'circle-color': '#ff5200' // Example styling
        }
      });

      this.filteredMigrations.forEach((migration) => {
        const popupContent = document.createElement('div');
        popupContent.innerHTML = `
          <h3>${migration.Name}</h3>
          <p>${migration.Description.slice(0, 150)}...</p>
          <a href="/migration/${migration.Id}" class="popup-link">show more</a>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContent);

        if (this.map) {
          const marker = new mapboxgl.Marker()
            .setLngLat([migration.Longitude, migration.Latitude])
            .setPopup(popup)
            .addTo(this.map);


            marker.getElement().addEventListener('click', () => {
              const popupLink = popupContent.querySelector('.popup-link');
              if (popupLink) {
                popupLink.addEventListener('click', (event) => {
                  event.preventDefault();
                  this.router.navigate(['/migration', migration.Id]);
                });
              }
            });
        }
      });
    });
  }
}

