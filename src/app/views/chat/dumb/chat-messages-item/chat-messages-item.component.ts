import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-messages-item',
  templateUrl: './chat-messages-item.component.html',
  styleUrls: ['./chat-messages-item.component.scss']
})
export class ChatMessagesItemComponent implements OnInit {
  @Input() isCurrentUser: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
