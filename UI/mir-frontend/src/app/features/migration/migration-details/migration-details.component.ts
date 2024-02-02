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

  constructor(private router: ActivatedRoute, private migrationService: MigrationService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next: (params) => {
        this.id = params.get("id");
        if(this.id) {
          this.migrationService.getMigration(this.id).subscribe({
            next: (response) => {
              console.log(response)
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
