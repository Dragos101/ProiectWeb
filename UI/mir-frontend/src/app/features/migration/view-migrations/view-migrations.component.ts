import { Component, OnInit } from '@angular/core';
import { Observable, asapScheduler } from 'rxjs';
import { MigrationModel } from '../models/migration.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MigrationService } from '../services/migration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-migrations',
  templateUrl: './view-migrations.component.html',
  styleUrls: ['./view-migrations.component.sass']
})
export class ViewMigrationsComponent implements OnInit {
  migrations?: MigrationModel[]
  userId: string | null = null

  constructor(private router: Router, private route: ActivatedRoute, private migrationService: MigrationService) {}

  showLessDescription(description: string): boolean {
    return description.length > 150
  }

  hasMigrations(): boolean {
    return this.migrations !== undefined && this.migrations?.length > 0
  }

  handleDeleteMigration(migrationId: string): void {
    this.migrationService.deleteMigration(migrationId).subscribe({
      next: (response) => {
        console.log(response)
        this.migrations = this.migrations?.filter(migration => migration.Id !== migrationId)
      }
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.userId = params.get('id')
        if (this.userId) {
          this.migrationService.getUserMigrations(this.userId).subscribe({
            next: (response) => {
              this.migrations = response
            }
          })
        }
      }
    });
  }
}
