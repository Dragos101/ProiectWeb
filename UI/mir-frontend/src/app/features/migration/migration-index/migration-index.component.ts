import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.development';
import { MigrationModel } from '../models/migration.model';
import { MigrationService } from '../services/migration.service';

@Component({
  selector: 'app-migration-index',
  templateUrl: './migration-index.component.html',
  styleUrls: ['./migration-index.component.sass']
})

export class MigrationIndexComponent implements OnInit {
  map?: mapboxgl.Map
  migrations: MigrationModel[]

  constructor(private migrationService: MigrationService) {
    (mapboxgl as any).accessToken = environment.mapBoxApi
    this.migrations = []
  }

  ngOnInit(): void {
    this.migrationService.getMigrations().subscribe({
      next: (response) => {
        this.migrations = response
        console.log(this.migrations)
        this.initializeMap();
      }
    })
  }

  initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 2,
      center: [-16.743686, 46.054594],
    });

    this.map.on('load', () => {
      this.migrations.forEach((migration) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${migration.Name}</h3><p>${migration.Description}</p>`
        );

        if (this.map) {
          new mapboxgl.Marker()
            .setLngLat([migration.Longitude, migration.Latitude])
            .setPopup(popup)
            .addTo(this.map);
        }
      });
    });
  }
}

