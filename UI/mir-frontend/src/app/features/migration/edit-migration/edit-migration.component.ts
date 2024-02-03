import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MigrationService } from '../services/migration.service';
import { MigrationModel } from '../models/migration.model';

@Component({
  selector: 'app-edit-migration',
  templateUrl: './edit-migration.component.html',
  styleUrls: ['./edit-migration.component.sass']
})
export class EditMigrationComponent implements OnInit {
  migration?: MigrationModel
  migrationId: string | null = null
  file: File | null = null

  constructor(private router: Router, private params: ActivatedRoute, private migrationService: MigrationService) {
    this.migration = {
      Id: "",
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
    this.params.paramMap.subscribe({
      next: (response) => {
        this.migrationId = response.get('id');

        if (this.migrationId) {
          this.migrationService.getMigration(this.migrationId).subscribe({
            next: (response) => {
              this.migration = response[0]
              console.log(this.migration)
            }
          })
        }
      }
    })
  }

  uploadFile(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      if (this.file) {
        this.migrationService.uploadFile(this.file, "images").subscribe({
          next: (response) => {
            if (response && response.body.url) {
              this.migration!.ThumbnailUrl = response.body.url;
              console.log(this.migration)
            }
          }
        })
      }
    }
  }

  submitMigration(): void {
    this.migrationService.updateMigraton(this.migration!.Id, this.migration!).subscribe({
      next: () => {
        this.router.navigateByUrl(`/migration/${this.migration?.Id}`)
      }
    })
  }
}
