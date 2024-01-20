import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MigrationIndexComponent } from './features/migration/migration-index/migration-index.component';
import { AddMigrationComponent } from './features/migration/add-migration/add-migration.component';

@NgModule({
  declarations: [
    AppComponent,
    MigrationIndexComponent,
    AddMigrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
