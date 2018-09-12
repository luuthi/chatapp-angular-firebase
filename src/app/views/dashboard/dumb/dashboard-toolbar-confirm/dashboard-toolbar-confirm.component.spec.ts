import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardToolbarConfirmComponent } from './dashboard-toolbar-confirm.component';

describe('DasboardToolbarConfirmComponent', () => {
  let component: DashboardToolbarConfirmComponent;
  let fixture: ComponentFixture<DashboardToolbarConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardToolbarConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardToolbarConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
