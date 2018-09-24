import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../core/model/user';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
    // console.log(this.user);
  }

}
