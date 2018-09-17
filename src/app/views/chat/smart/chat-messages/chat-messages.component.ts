import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../../core/model/user';
import { Message } from '../../../../core/model/message';
import { ChatFireBaseService } from '../../services/chat-firebase.service';
import { UserRole } from '../../../../core/constant/enum';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  animations: [
    trigger('flyInFade', [
      state('true' , style({transform: 'translateX(0)', display: 'block'})),
      state('false', style({transform: 'translateX(50%)', display: 'none'})),
      transition('* => *', animate('0.3s ease-in-out')),
    ])
  ],
  // animations: [
  //   trigger('flyInOut', [
  //     state('in', style({transform: 'translateX(0)'})),
  //     transition('void => *', [
  //       style({transform: 'translateX(-100%)'}),
  //       animate(100)
  //     ]),
  //     transition('* => void', [
  //       animate(100, style({transform: 'translateX(100%)'}))
  //     ])
  //   ])
  // ]
})
export class ChatMessagesComponent implements OnInit {
  @Input() flyInFade: boolean = false;
  @Output() actionBack: EventEmitter<any> = new EventEmitter();

  listMessage: Array<Message>;
  @Input() user : User;
  isCanBack : boolean = false;

  constructor(private chatFirebaseService: ChatFireBaseService) { }

  ngOnInit() {
    console.log(this.user);
    if(this.user.type === UserRole.admin || this.user.type === UserRole.supporter){
      this.isCanBack = true;
    }
  }

}
