import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarToolbarDatePickerComponent } from './dashboar-toolbar-date-picker.component';

describe('DashboarToolbarDatePickerComponent', () => {
  let component: DashboarToolbarDatePickerComponent;
  let fixture: ComponentFixture<DashboarToolbarDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboarToolbarDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboarToolbarDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
