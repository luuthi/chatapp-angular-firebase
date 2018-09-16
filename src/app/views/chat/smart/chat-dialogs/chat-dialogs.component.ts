import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChatFireBaseService } from '../../services/chat-firebase.service';
import { Observable } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/auth"
import { auth } from 'firebase';
import { User } from '../../../../core/model/user';
import { UserRole } from '../../../../core/constant/enum';
import { Conversation } from '../../../../core/model/conversation';

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
  cur_user : any;

  constructor(
    public chatFireBaseService: ChatFireBaseService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    // this.createDataDemo();
    this.getUserFireBaseDatabase();
    this.getConversationFireBaseDatabase();
  }

  getUserFireBaseDatabase(){
    this.users = this.chatFireBaseService.getUser();
  }

  createDataDemo(){
    this.chatFireBaseService.createConversationDemo();
    this.chatFireBaseService.createuserDemo();
  }

  getConversationFireBaseDatabase(){
    this.conversation = this.chatFireBaseService.getListConversation();
    console.log(this.conversation);
  }

  convertArrayUser(){

  }

  viewMessagesOrDialogs(){
    this.isViewMes = !this.isViewMes;
  }

  login(){
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((data)=>{
        this.cur_user = this.afAuth.auth.currentUser;
        this.chatFireBaseService.checkUserExist(this.cur_user.uid, ()=>{
            this.addNewUser(this.cur_user);
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
    let conversationID =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let conversation = new Conversation(conversationID, []);
    this.chatFireBaseService.addConversation(conversation, user);
  }

}
