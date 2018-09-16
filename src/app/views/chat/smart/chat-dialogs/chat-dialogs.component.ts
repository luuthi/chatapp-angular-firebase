import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChatFireBaseService } from '../../services/chat-firebase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/auth"
import { auth } from 'firebase';
import { User } from '../../../../core/model/user';
import { UserRole } from '../../../../core/constant/enum';

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
        console.log(this.cur_user);
        this.chatFireBaseService.checkUserExist(this.cur_user.uid, ()=>{
            let user = new User(this.cur_user.uid, this.cur_user.email, this.cur_user.displayName,
              this.cur_user.photoURL, this.cur_user.photoURL, this.cur_user.email, null, UserRole.customer);
            this.chatFireBaseService.addUser(user);
        });
      });
      
  }

  logout() {
      this.afAuth.auth.signOut();
  }

}
