import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMigrationComponent } from './add-migration.component';

describe('AddMigrationComponent', () => {
  let component: AddMigrationComponent;
  let fixture: ComponentFixture<AddMigrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMigrationComponent]
    });
    fixture = TestBed.createComponent(AddMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
