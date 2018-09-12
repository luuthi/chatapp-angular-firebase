import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardTimetableComponent } from './dashboard-timetable.component';


describe('DashboardTimetableComponent', () => {
  let component: DashboardTimetableComponent;
  let fixture: ComponentFixture<DashboardTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
