import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMigrationsComponent } from './view-migrations.component';

describe('ViewMigrationsComponent', () => {
  let component: ViewMigrationsComponent;
  let fixture: ComponentFixture<ViewMigrationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMigrationsComponent]
    });
    fixture = TestBed.createComponent(ViewMigrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
