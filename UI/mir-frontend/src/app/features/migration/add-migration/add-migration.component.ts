import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MigrationService } from '../services/migration.service';
import { MigrationRequest } from '../models/migration-request.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-migration',
  templateUrl: './add-migration.component.html',
  styleUrls: ['./add-migration.component.sass']
})
export class AddMigrationComponent implements OnInit {
  migration: MigrationRequest
  userId?: string | null = null
  file: File | null = null

  constructor(private migrationService: MigrationService, private router: Router) {
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
  }

  uploadFile(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      if (this.file) {
        this.migrationService.uploadFile(this.file, "images").subscribe({
          next: (response) => {
            if (response && response.body.url) {
              this.migration = response.body.url;
              console.log(this.migration)
            }
          }
        })
      }
    }
  }

  submitMigration(): void {
    this.migrationService.createMigration(this.migration).subscribe({
      next: () => {
        this.router.navigateByUrl(`/user/${this.userId}/migrations`);
      }
    })
  }
}
