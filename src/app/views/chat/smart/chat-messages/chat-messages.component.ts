import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../../core/model/user';
import { Message } from '../../../../core/model/message';
import { ChatFireBaseService } from '../../services/chat-firebase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserConversation } from '../../../../core/model/user_conversation';
import { ScrollEvent } from 'ngx-scroll-event';

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
  conversationID: String;
  messageChat = "";
  lastMessage : String;
  loading: boolean = false;
  lastTime : number;
  curPosSroll : number;

  formMessage: FormGroup;

  constructor(private chatFirebaseService: ChatFireBaseService) { }

  ngOnInit() {
    if(this.curUser !== null){
      this.getMessageConversation(10);
      this.formMessage = new FormGroup({
        message: new FormControl(''),
      });
    }
  }

  checkIsCurrentUser(sendID: any):boolean{
    // if (this.curUser.userID === sendId)
    return this.curUser.userID === sendID;
  }

  updateLastMessage(){
    let ucCurUser = new UserConversation(this.conversationID, this.lastMessage, this.lastTime, 
      1, this.userChat.userChat, this.userChat.userPic, this.userChat.userID, this.userChat.type);
    let ucChatUser = new UserConversation(this.conversationID, this.lastMessage, this.lastTime, 
      1, this.curUser.fullName, this.curUser.picProfile, this.curUser.userID, this.curUser.type);
      this.chatFirebaseService.updateUserConversation(ucCurUser, this.curUser.userID, this.conversationID, this.curUser.type);
      this.chatFirebaseService.updateUserConversation(ucChatUser, this.userChat.userID, this.conversationID, this.userChat.type);
  }

  getMessageConversation(numMess : number){
    let self = this;
    if(this.curUser.conversation != null){
      this.conversationID = this.userChat["conversationID"];
      this.chatFirebaseService.getListMessageConversation(this.conversationID.toString(), numMess)
      .on('value', function(snapshot){
        let data = snapshot.val();
        for (let key in data){
          let item = data[key];
          if (item !== undefined && item !== null){
            if (!self.checkMessageExist(item)) {
              item['mesageTime_format'] = new Date(item['messageTime'] * 1000);
              self.listMessage.push(item);
              self.listMessage.sort((a,b) => (a['messageTime'] > b['messageTime']) ? 1 : ((b['messageTime'] > a['messageTime']) ? -1 : 0))
            }
          }
        }
        self.loading =  false;
        let elem = document.getElementsByClassName('list-mess');
        self.curPosSroll = elem[0].scrollTop;
      })
    }
    
  }

  checkMessageExist(item: any) {
    var i;
    for (i = 0; i < this.listMessage.length; i++) {
        if (this.listMessage[i].messageID === item.messageID) {
            return true;
        }
    }

    return false;
  }

  sendMessage(form: FormGroup){
    if (form.value.message !== ""){
      let time = new Date();
      this.lastMessage = form.value.message;
      this.lastTime = Math.round(time.getTime() / 1000);
      let mes = new Message(this.genID(), this.lastMessage, null, null, 
      this.curUser.userID, null, this.lastTime, false);
      this.chatFirebaseService.addMessage(mes, this.conversationID.toString());
      this.updateLastMessage();
      this.messageChat = "";
      form.controls.message.setValue("");
    }
    
  }
  public handleScroll(event: ScrollEvent) {
    if (event.isReachingTop) {
      if(!this.loading){
        this.loading =  true;
        setTimeout(()=>{
          this.getMessageConversation(this.listMessage.length + 10);
          let elem = document.getElementsByClassName('list-mess');
          elem[0].scrollTo(0, this.curPosSroll);
        }, 1000);
      }
    }
  }

  genID() {
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
  }
}
