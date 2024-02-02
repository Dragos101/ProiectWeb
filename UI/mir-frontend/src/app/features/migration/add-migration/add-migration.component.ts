import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MigrationService } from '../services/migration.service';
import { MigrationRequest } from '../models/migration-request.model';

@Component({
  selector: 'app-add-migration',
  templateUrl: './add-migration.component.html',
  styleUrls: ['./add-migration.component.sass']
})
export class AddMigrationComponent implements OnInit {
  migration: MigrationRequest
  userId?: string | null = null

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

  submitMigration(): void {
    this.migrationService.createMigration(this.migration).subscribe({
      next: () => {
        this.router.navigateByUrl(`/user/${this.userId}/migrations`);
      }
    })
  }
}
