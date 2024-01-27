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

  showLessDescription() {
    return this.description.length > 100
  }

  hasMigrations() {
    return this.migrations !== false
  }

  ngOnInit(): void {
    this.shortDescription = this.description.slice(0,150)
  }

}
