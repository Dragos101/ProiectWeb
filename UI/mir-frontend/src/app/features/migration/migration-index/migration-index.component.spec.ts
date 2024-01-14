import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrationIndexComponent } from './migration-index.component';

describe('MigrationIndexComponent', () => {
  let component: MigrationIndexComponent;
  let fixture: ComponentFixture<MigrationIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MigrationIndexComponent]
    });
    fixture = TestBed.createComponent(MigrationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
