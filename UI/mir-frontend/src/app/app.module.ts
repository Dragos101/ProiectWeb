import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MigrationIndexComponent } from './features/migration/migration-index/migration-index.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MigrationIndexComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
