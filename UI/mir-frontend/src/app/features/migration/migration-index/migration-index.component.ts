import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.development';
import { MigrationModel } from '../models/migration.model';
import { MigrationService } from '../services/migration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-migration-index',
  templateUrl: './migration-index.component.html',
  styleUrls: ['./migration-index.component.sass']
})

export class MigrationIndexComponent implements OnInit {
  map?: mapboxgl.Map
  migrations: MigrationModel[]

  constructor(private router: Router, private migrationService: MigrationService) {
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

