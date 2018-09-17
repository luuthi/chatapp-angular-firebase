import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChatFireBaseService } from '../../services/chat-firebase.service';
import { Observable } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/auth"
import { auth } from 'firebase';
import { User } from '../../../../core/model/user';
import { UserRole } from '../../../../core/constant/enum';
import { Conversation } from '../../../../core/model/conversation';
import { Message } from '../../../../core/model/message';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-chat-dialogs',
  templateUrl: './chat-dialogs.component.html',
  styleUrls: ['./chat-dialogs.component.scss'],
  animations: [
    trigger('flyOutFade', [
      state('true' , style({transform: 'translateX(0)', display: 'inline-block'})),
      state('false', style({transform: 'translateX(-100%)', display: 'none'})),
      transition('* => *', animate('0.3s ease-in-out')),
    ])
  ]
})
export class ChatDialogsComponent implements OnInit {
  public state = 'inactive';
  isViewMes: boolean = false;

  users: any;
  conversation: Observable<any[]>;
  curUser : any;

  constructor(
    public chatFireBaseService: ChatFireBaseService,
    public afAuth: AngularFireAuth
  ) { 
    
  }

  ngOnInit() {
    // this.createDataDemo();
    this.getUserFireBaseDatabase();
    this.getConversationFireBaseDatabase();
    // this.convertArrayUser();
  }

  getUserFireBaseDatabase(){
    this.users = this.chatFireBaseService.getUser();
  }

  createDataDemo(){
    // this.chatFireBaseService.createConversationDemo();
    this.chatFireBaseService.createuserDemo();
  }

  getConversationFireBaseDatabase(){
    this.conversation = this.chatFireBaseService.getListConversation();
    // console.log(this.conversation);
  }

  arr = Array<any>();
  convertArrayConversationUser():Array<string>{
    this.users.forEach(element => {
      element.forEach(res => {
        // if (this.cur_user)
        if (this.arr.indexOf(res.fullName) === -1) {
          this.arr.push(res.fullName);
        }
      })
    });
    console.log(JSON.stringify(this.arr));
    return this.arr;
  }

  viewMessagesOrDialogs(){
    this.isViewMes = !this.isViewMes;
  }

  login(){
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((data)=>{
        this.curUser = this.afAuth.auth.currentUser;
        let user = new User(this.curUser.uid, this.curUser.email, this.curUser.displayName,
          this.curUser.photoURL, this.curUser.photoURL, this.curUser.email, null, UserRole.customer);
        this.chatFireBaseService.checkUserExist(this.curUser.uid, ()=>{
            this.addNewUser(user);
        });
        localStorage.setItem('userLogin', JSON.stringify(user));
      });
  }

  addNewUser(user){
    this.chatFireBaseService.addUser(user).then(data=>{
      this.addNewConversation(user);
    });
  }

  addNewConversation(user){
    var self = this;
    let newConversationID = this.genID();
    let newMessageID = this.genID();
    let currentTime = Math.round(new Date().getTime() / 1000);
    this.chatFireBaseService.getAdminAcc().on('value', function(snapshot){
      let data = snapshot.val();
      let arrAdmin = [];
      for(let key in data){
          arrAdmin.push(data[key]);
      }
      let firstMessage = new Message(newMessageID, "Welcome " + user.fullName + ", willing to help you", null, null, arrAdmin[0].userID, null, currentTime, false);
      let conversation = new Conversation(newConversationID, [firstMessage]);
      self.chatFireBaseService.addConversation(conversation, user)
    });
    ;
  }
  genID(){
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
  }
}
