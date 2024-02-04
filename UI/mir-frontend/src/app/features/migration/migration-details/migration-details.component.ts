import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MigrationModel } from '../models/migration.model';
import { MigrationService } from '../services/migration.service';

@Component({
  selector: 'app-migration-details',
  templateUrl: './migration-details.component.html',
  styleUrls: ['./migration-details.component.sass']
})
export class MigrationDetailsComponent implements OnInit {
  id: string | null = null;
  migration?: MigrationModel | null = null
  isLoading: boolean = true
  userId: string | null = null

  constructor(private router: ActivatedRoute, private migrationService: MigrationService) { }

  isAuthorized(): boolean {
    return this.migration?.UserId == this.userId
  }

  getThumb(): string {
    return this.migration?.ThumbnailUrl !== '' ? this.migration!.ThumbnailUrl : '/assets/images/landing-image.png'

  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user-id');
    this.router.paramMap.subscribe({
      next: (params) => {
        this.id = params.get("id");
        if(this.id) {
          this.migrationService.getMigration(this.id).subscribe({
            next: (response) => {
              this.migration = response[0];
              this.isLoading = false;
            }
          })
        }
        else {
          this.isLoading = true;
        }
      }
    })
  }

}
