import { Component, OnInit } from '@angular/core';
import { MigrationService } from '../../migration/services/migration.service';
import { MigrationModel } from '../../migration/models/migration.model';

@Component({
  selector: 'app-view-statistics',
  templateUrl: './view-statistics.component.html',
  styleUrls: ['./view-statistics.component.sass']
})
export class ViewStatisticsComponent implements OnInit {
  migrations: MigrationModel[]
  migrationsBySeason: any[];
  migrationsByCategory: any[];
  migrationsByCategoryAndSeason: any[];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private migrationService: MigrationService) {
    this.migrations = []
    this.migrationsBySeason = []
    this.migrationsByCategory = []
    this.migrationsByCategoryAndSeason = []
  }

  ngOnInit(): void {
    this.migrationService.getMigrations().subscribe({
      next: (response) => {
        this.migrations = response
        console.log(this.migrations)
        this.processMigrationsData();
        this.processCategoriesData();
        this.processDataByCategoryAndSeason();
      }
    })
  }

  private processMigrationsData(): void {
    const seasonCounts = this.migrations.reduce((acc: { [key: string]: number }, migration) => {
      const season = migration.Season || 'Unknown';
      acc[season] = (acc[season] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    this.migrationsBySeason = Object.keys(seasonCounts).map(season => ({
      name: season,
      value: seasonCounts[season]
    }));
  }

  private processCategoriesData(): void {
    const categoryCounts = this.migrations.reduce((acc: { [key: string]: number }, migration) => {
      const category = migration.Category || 'Unknown';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    this.migrationsByCategory = Object.keys(categoryCounts).map(category => ({
      name: category,
      value: categoryCounts[category]
    }));
  }

  private processDataByCategoryAndSeason(): void {
    const counts = this.migrations.reduce((acc: { [key: string]: { [season: string]: number } }, migration) => {
      const category = migration.Category || 'Unknown';
      const season = migration.Season || 'Unknown';
      acc[category] = acc[category] || {};
      acc[category][season] = (acc[category][season] || 0) + 1;
      return acc;
    }, {});

    this.migrationsByCategoryAndSeason = Object.entries(counts).map(([category, seasons]) => {
      const seasonsData = Object.entries(seasons).map(([season, count]) => ({
        name: season,
        value: count
      }));
      return { name: category, series: seasonsData };
    });
  }


}
