import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMigrationComponent } from './edit-migration.component';

describe('EditMigrationComponent', () => {
  let component: EditMigrationComponent;
  let fixture: ComponentFixture<EditMigrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMigrationComponent]
    });
    fixture = TestBed.createComponent(EditMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
