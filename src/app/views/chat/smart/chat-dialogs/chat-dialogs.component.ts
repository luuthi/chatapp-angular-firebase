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
  ) { }

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
    this.chatFireBaseService.createConversationDemo();
    // this.chatFireBaseService.createuserDemo();
  }

  getConversationFireBaseDatabase(){
    this.conversation = this.chatFireBaseService.getListConversation();
    // console.log(this.conversation);
  }

  arr = Array<any>();
  convertArrayConversationUser():Array<string>{
    this.users.forEach(element => {
      element.forEach(res => {
        console.log(this.cur_user);
        // && this.cur_user.uid != res.userID
        if (this.arr.indexOf(res.fullName) === -1 ) {
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
        console.log(this.curUser);
        this.chatFireBaseService.checkUserExist(this.curUser.uid, ()=>{
            this.addNewUser(this.curUser);
        });
      });
  }

  addNewUser(user){
    let newUser = new User(user.uid, user.email, user.displayName,
      user.photoURL, user.photoURL, user.email, null, UserRole.customer);
    this.chatFireBaseService.addUser(newUser).then(data=>{
      this.addNewConversation(newUser);
    });
  }

  addNewConversation(user){
    let newConversationID =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let newMessageID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
    let currentTime = Math.round(new Date().getTime() / 1000);
    let firstMessage = new Message(newMessageID, "Welcome " + user.fullName + ", willing to help you", null, null, null, null, currentTime, false);
    let conversation = new Conversation(newConversationID, [firstMessage]);
    this.chatFireBaseService.addConversation(conversation, user);
  }
}
