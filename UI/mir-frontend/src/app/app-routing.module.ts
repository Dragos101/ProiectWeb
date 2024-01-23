import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MigrationIndexComponent } from './features/migration/migration-index/migration-index.component';
import { AddMigrationComponent } from './features/migration/add-migration/add-migration.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { MigrationDetailsComponent } from './features/migration/migration-details/migration-details.component';


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
    path: '',
    component: LandingPageComponent
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
