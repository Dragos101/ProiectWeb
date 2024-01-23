import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-migration',
  templateUrl: './add-migration.component.html',
  styleUrls: ['./add-migration.component.sass']
})
export class AddMigrationComponent {
  constructor(private router: Router) {

  }

  submitMigration(): void {
    this.router.navigateByUrl('/migrations')
  }
}
