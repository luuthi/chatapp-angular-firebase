import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCustomerAddComponent } from './management-customer-add.component';

describe('ManagementCustomerAddComponent', () => {
  let component: ManagementCustomerAddComponent;
  let fixture: ComponentFixture<ManagementCustomerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementCustomerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCustomerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
