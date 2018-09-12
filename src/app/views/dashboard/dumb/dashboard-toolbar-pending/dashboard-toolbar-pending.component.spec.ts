import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardToolbarPendingComponent } from './dashboard-toolbar-pending.component';

describe('DashboardToolbarPendingComponent', () => {
  let component: DashboardToolbarPendingComponent;
  let fixture: ComponentFixture<DashboardToolbarPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardToolbarPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardToolbarPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
