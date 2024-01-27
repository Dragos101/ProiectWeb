import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-migration-index',
  templateUrl: './migration-index.component.html',
  styleUrls: ['./migration-index.component.sass']
})

export class MigrationIndexComponent implements OnInit {
  map?: mapboxgl.Map

  constructor() {
    (mapboxgl as any).accessToken = environment.mapBoxApi
  }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 6,
      center: [24.9668, 45.9432],
    })

    const popup = new mapboxgl.Popup().setHTML(
      `<h3>Migratie 1</h3><p>Pasarile calatoare pe la cuiburi se aduna</p>`
    );

    new mapboxgl.Marker()
      .setLngLat([24.9668, 45.9432])
      .setPopup(popup)
      .addTo(this.map);
  }
}

