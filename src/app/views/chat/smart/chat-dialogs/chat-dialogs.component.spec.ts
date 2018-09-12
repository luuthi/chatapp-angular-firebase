import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDialogsComponent } from './chat-dialogs.component';

describe('ChatDialogsComponent', () => {
  let component: ChatDialogsComponent;
  let fixture: ComponentFixture<ChatDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
