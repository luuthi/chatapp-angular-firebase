import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagesItemComponent } from './chat-messages-item.component';

describe('ChatMessagesItemComponent', () => {
  let component: ChatMessagesItemComponent;
  let fixture: ComponentFixture<ChatMessagesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessagesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessagesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
