import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MigrationIndexComponent } from './features/migration/migration-index/migration-index.component';

const routes: Routes = [
  {
    path: 'migrations',
    component: MigrationIndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
