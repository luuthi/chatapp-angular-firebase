import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentDialogsComponent } from './add-appointment-dialogs.component';

describe('AddAppointmentDialogsComponent', () => {
  let component: AddAppointmentDialogsComponent;
  let fixture: ComponentFixture<AddAppointmentDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppointmentDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppointmentDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
