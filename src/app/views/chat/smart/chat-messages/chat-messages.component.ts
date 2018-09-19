import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../../core/model/user';
import { Message } from '../../../../core/model/message';
import { ChatFireBaseService } from '../../services/chat-firebase.service';
import { UserRole } from '../../../../core/constant/enum';
import { FormGroup, FormControl } from '@angular/forms';

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

  listMessage: Array<any> = [];
  @Input() curUser : User;
  @Input() userChat : User;
  isCanBack : boolean = false;

  formMessage: FormGroup;

  constructor(private chatFirebaseService: ChatFireBaseService) { }

  ngOnInit() {
    if(this.curUser.type === UserRole.admin || this.curUser.type === UserRole.supporter){
      this.isCanBack = true;
    }
    this.getMessageConversation();
    this.formMessage = new FormGroup({
      message: new FormControl(''),
    });
  }

  checkIsCurrentUser(sendID: any):boolean{
    // if (this.curUser.userID === sendId)
    return this.curUser.userID === sendID;
  }

  getMessageConversation(){
    this.chatFirebaseService.getListMessageConversation(this.curUser.conversation.conversationID)
    .forEach(element => {
      element.forEach(item => {
        console.log(!this.checkMessageExist(item));
        if (item != this.curUser.conversation.conversationID && item != undefined){
          
          if (!this.checkMessageExist(item)) {
            this.listMessage.push(item);
          }
          
        }
      });
    });
  }

  checkMessageExist(item: any) {
    var i;
    for (i = 0; i < this.listMessage.length; i++) {
        if (this.listMessage[i].messageID === item.messageID) {
            console.log(this.listMessage[i]);
            return true;
        }
    }

    return false;
  }

  sendMessage(form: FormGroup){
    let time = new Date();
    let mes = new Message(this.genID(), form.value.message, null, null, this.curUser.userID, null, time.getTime(), false);
    this.chatFirebaseService.addMessage(mes, this.curUser.conversation.conversationID);
  }

  genID() {
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
  }
}
