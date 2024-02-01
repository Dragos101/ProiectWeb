import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MigrationIndexComponent } from './features/migration/migration-index/migration-index.component';
import { AddMigrationComponent } from './features/migration/add-migration/add-migration.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { MigrationDetailsComponent } from './features/migration/migration-details/migration-details.component';
import { ViewMigrationsComponent } from './features/migration/view-migrations/view-migrations.component';
import { EditMigrationComponent } from './features/migration/edit-migration/edit-migration.component';


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
    path: 'migrations/:id/edit',
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
    path: 'migrations/:id',
    component: MigrationDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
