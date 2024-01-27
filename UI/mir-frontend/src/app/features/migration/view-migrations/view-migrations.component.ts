import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-migrations',
  templateUrl: './view-migrations.component.html',
  styleUrls: ['./view-migrations.component.sass']
})
export class ViewMigrationsComponent implements OnInit {
  migrations: boolean = false
  description: string = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum molestiae animi, explicabo nesciunt nobis qui soluta quia repellat tenetur et repellendus est, voluptatum expedita ullam, ut a aperiam ratione rem?'
  shortDescription?: string

  showLessDescription(): boolean {
    return this.description.length > 100
  }

  hasMigrations(): boolean {
    return this.migrations !== false
  }

  handleDeleteMigration(): void {
    console.log("Delete works")
  }

  ngOnInit(): void {
    this.shortDescription = this.description.slice(0,150)
  }

}
