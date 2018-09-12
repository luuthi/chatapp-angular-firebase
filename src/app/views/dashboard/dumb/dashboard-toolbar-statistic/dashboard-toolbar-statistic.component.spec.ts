import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardToolbarStatisticComponent } from './dashboard-toolbar-statistic.component';

describe('DashboardToolbarStatisticComponent', () => {
  let component: DashboardToolbarStatisticComponent;
  let fixture: ComponentFixture<DashboardToolbarStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardToolbarStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardToolbarStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
