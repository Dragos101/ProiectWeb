import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MigrationIndexComponent } from './features/migration/migration-index/migration-index.component';
import { AddMigrationComponent } from './features/migration/add-migration/add-migration.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MigrationDetailsComponent } from './features/migration/migration-details/migration-details.component';
import { ViewMigrationsComponent } from './features/migration/view-migrations/view-migrations.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { EditMigrationComponent } from './features/migration/edit-migration/edit-migration.component';
import { ViewStatisticsComponent } from './features/statistics/view-statistics/view-statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    AppComponent,
    MigrationIndexComponent,
    AddMigrationComponent,
    LandingPageComponent,
    NavbarComponent,
    MigrationDetailsComponent,
    ViewMigrationsComponent,
    EditMigrationComponent,
    ViewStatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxMapboxGLModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
