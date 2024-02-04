import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MigrationIndexComponent } from './features/migration/migration-index/migration-index.component';
import { AddMigrationComponent } from './features/migration/add-migration/add-migration.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { MigrationDetailsComponent } from './features/migration/migration-details/migration-details.component';
import { ViewMigrationsComponent } from './features/migration/view-migrations/view-migrations.component';
import { EditMigrationComponent } from './features/migration/edit-migration/edit-migration.component';
import { ViewStatisticsComponent } from './features/statistics/view-statistics/view-statistics.component';


const routes: Routes = [
  {
    path: 'migrations',
    component: MigrationIndexComponent
  },
  {
    path: 'migrations/add',
    component: AddMigrationComponent
  },
  {
    path: 'migration/:id/edit',
    component: EditMigrationComponent
  },
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'user/:id/migrations',
    component: ViewMigrationsComponent
  },
  {
    path: 'migration/:id',
    component: MigrationDetailsComponent
  },
  {
    path: 'statistics',
    component: ViewStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
