import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-migration',
  templateUrl: './edit-migration.component.html',
  styleUrls: ['./edit-migration.component.sass']
})
export class EditMigrationComponent {
  constructor(private router: Router) {

  }
  submitMigration(): void {
    this.router.navigateByUrl('/migrations')
  }
}
