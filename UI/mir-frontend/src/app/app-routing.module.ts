import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MigrationIndexComponent } from './features/migration/migration-index/migration-index.component';
import { AddMigrationComponent } from './features/migration/add-migration/add-migration.component';

const routes: Routes = [
  {
    path: 'migrations',
    component: MigrationIndexComponent
  },
  {
    path: 'migrations/add',
    component: AddMigrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
