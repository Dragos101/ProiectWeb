import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MigrationService } from '../services/migration.service';
import { MigrationRequest } from '../models/migration-request.model';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-add-migration',
  templateUrl: './add-migration.component.html',
  styleUrls: ['./add-migration.component.sass']
})
export class AddMigrationComponent implements OnInit {
  migration: MigrationRequest
  userId?: string | null = null
  file: File | null = null
  countries: string[] = []
  cities: string[] = []


  constructor(private http: HttpClient, private migrationService: MigrationService, private router: Router) {
    this.migration = {
      UserId: "",
      Name: "",
      Description: "",
      Season: "",
      Working: "",
      PoliticFactors: "",
      Calamity: "",
      Category: "",
      Latitude: 0,
      Longitude: 0,
      ThumbnailUrl: "",
      City: "",
      Country: ""
    }
   }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    if (this.userId){
      this.migration.UserId = this.userId;
    }
    this.loadCountriesAndCities();
  }

  uploadFile(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      if (this.file) {
        this.migrationService.uploadFile(this.file, "images").subscribe({
          next: (response) => {
            if (response && response.body.url) {
              this.migration.ThumbnailUrl = response.body.url;
              console.log(this.migration)
            }
          }
        })
      }
    }
  }

  loadCountriesAndCities(): void {
    this.migrationService.getWorldData().subscribe(data => {
      this.countries = data.map(item => item.country).filter((value, index, self) => self.indexOf(value) === index); // Extract unique countries
    });
  }

  onCountryChange(): void {
    this.migrationService.getWorldData().subscribe(data => {
      const countryData = data.find(item => item.country === this.migration.Country);
      if (countryData && countryData.cities) {
        this.cities = countryData.cities.map((city: City) => city.name);
      }
    });
  }

  onCityChange(): void {
    this.migrationService.getWorldData().subscribe(data => {
      const countryData = data.find(item => item.country === this.migration.Country);
      if (countryData) {
        const selectedCity = countryData.cities.find(city => city.name === this.migration.City);
        if (selectedCity) {
          this.migration.Latitude = selectedCity.lat;
          this.migration.Longitude = selectedCity.lon;
        }
      }
    });
  }

  submitMigration(): void {
    this.migrationService.createMigration(this.migration).subscribe({
      next: () => {
        this.router.navigateByUrl(`/user/${this.userId}/migrations`);
      }
    })
  }
}
