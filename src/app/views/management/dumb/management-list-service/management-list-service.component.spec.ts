import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementListServiceComponent } from './management-list-service.component';

describe('ManagementListServiceComponent', () => {
  let component: ManagementListServiceComponent;
  let fixture: ComponentFixture<ManagementListServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementListServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementListServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
