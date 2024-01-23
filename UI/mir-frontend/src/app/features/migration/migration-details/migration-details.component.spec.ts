import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationDetailsComponent } from './migration-details.component';

describe('MigrationDetailsComponent', () => {
  let component: MigrationDetailsComponent;
  let fixture: ComponentFixture<MigrationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MigrationDetailsComponent]
    });
    fixture = TestBed.createComponent(MigrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
