import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDialogsItemComponent } from './chat-dialogs-item.component';

describe('ChatDialogsItemComponent', () => {
  let component: ChatDialogsItemComponent;
  let fixture: ComponentFixture<ChatDialogsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDialogsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDialogsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
