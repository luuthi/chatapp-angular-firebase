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
  @Input() userChat : any;
  isCanBack : boolean = false;
  conversationID: String;
  messageChat = "";

  formMessage: FormGroup;

  constructor(private chatFirebaseService: ChatFireBaseService) { }

  ngOnInit() {
    if(this.curUser !== null){
      if(this.curUser.type === UserRole.admin || this.curUser.type === UserRole.supporter){
        this.isCanBack = true;
      }
      this.getMessageConversation();
      this.formMessage = new FormGroup({
        message: new FormControl(''),
      });
    }
  }

  checkIsCurrentUser(sendID: any):boolean{
    // if (this.curUser.userID === sendId)
    return this.curUser.userID === sendID;
  }

  getMessageConversation(){
    if(this.curUser.conversation != null){
      this.conversationID = this.userChat["conversationID"];
      this.chatFirebaseService.getListMessageConversation(this.conversationID.toString())
      .forEach(element => {
        element.forEach(item => {
          console.log(!this.checkMessageExist(item));
          if (item !== undefined && item !== null){
            if (!this.checkMessageExist(item)) {
              let date = new Date(item['messageTime'] * 1000).toLocaleDateString();
              let time = new Date(item['messageTime'] * 1000).toLocaleTimeString();
              item['date'] = date;
              item['time'] = time;
              this.listMessage.push(item);
              this.listMessage.sort((a,b) => (a['messageTime'] > b['messageTime']) ? 1 : ((b['messageTime'] > a['messageTime']) ? -1 : 0))
            }
            
          }
        });
      });
    }
    
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
    let mes = new Message(this.genID(), form.value.message, null, null, this.curUser.userID, null, Math.round(time.getTime() / 1000), false);
    this.chatFirebaseService.addMessage(mes, this.conversationID.toString());
    this.messageChat = "";
  }

  genID() {
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
  }
}
