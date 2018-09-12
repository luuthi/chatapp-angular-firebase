import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardToolbarNotificationComponent } from './dashboard-toolbar-notification.component';

describe('DasboardToolbarNotificationComponent', () => {
  let component: DashboardToolbarNotificationComponent;
  let fixture: ComponentFixture<DashboardToolbarNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardToolbarNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardToolbarNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
