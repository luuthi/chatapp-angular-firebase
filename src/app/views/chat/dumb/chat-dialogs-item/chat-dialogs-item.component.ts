import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-dialogs-item',
  templateUrl: './chat-dialogs-item.component.html',
  styleUrls: ['./chat-dialogs-item.component.scss']
})
export class ChatDialogsItemComponent implements OnInit {

  @Input() user: any;
  
  constructor() { }

  ngOnInit() {
  }

}
