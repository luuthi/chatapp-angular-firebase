import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementObjDetailComponent } from './management-obj-detail.component';

describe('ManagementObjDetailComponent', () => {
  let component: ManagementObjDetailComponent;
  let fixture: ComponentFixture<ManagementObjDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementObjDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementObjDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
