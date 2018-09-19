import {Component, OnInit, Input, EventEmitter, Output}from '@angular/core'; 
import {trigger, state, style, animate, transition }from '@angular/animations'; 
import {ChatFireBaseService }from '../../services/chat-firebase.service'; 
import {Observable }from 'rxjs'; 
import {AngularFireAuth}from "@angular/fire/auth"
import {auth }from 'firebase'; 
import {User }from '../../../../core/model/user'; 
import {UserRole }from '../../../../core/constant/enum'; 
import {Conversation }from '../../../../core/model/conversation'; 
import {Message }from '../../../../core/model/message'; 
import {async }from 'rxjs/internal/scheduler/async'; 

@Component( {
  selector:'app-chat-dialogs', 
  templateUrl:'./chat-dialogs.component.html', 
  styleUrls:['./chat-dialogs.component.scss'], 
  animations:[
    trigger('flyOutFade', [
      state('true', style( {transform:'translateX(0)', display:'inline-block'})), 
      state('false', style( {transform:'translateX(-100%)', display:'none'})), 
      transition('* => *', animate('0.3s ease-in-out')), 
    ])
  ]
})
export class ChatDialogsComponent implements OnInit {
  public state = 'inactive'; 
  isViewMes:boolean = false; 
  isLogin : boolean;
  @Output() doLogOut: EventEmitter<any> = new EventEmitter();

  users:any; 
  conversation:Observable < any[] > ; 
  curUser: User; 

  userActive: any;

  constructor(
    public chatFireBaseService:ChatFireBaseService, 
    public afAuth:AngularFireAuth) {
      this.chatFireBaseService.listen().subscribe((m:any) => {
        this.logout();
    })
    }

  ngOnInit() {
    // this.createDataDemo();
    this.getUserLocal();
    this.getUserFireBaseDatabase(); 
    this.getConversationFireBaseDatabase();
    // this.convertArrayUser();
  }

  getUserLocal(){
    let data = localStorage.getItem("userLogin");
    if (data != undefined || data != null){
      this.curUser = JSON.parse(data);
      if (this.curUser.type === UserRole.customer){
        this.isViewMes = true;
      }else{
        this.isViewMes = false;
      }
      this.isLogin = true;
    }else{
      this.curUser = null;
      this.isLogin = false;
    }
  }

  getUserFireBaseDatabase() {
    this.users = this.chatFireBaseService.getUser(); 
  }

  createDataDemo() {
    // this.chatFireBaseService.createConversationDemo();
    this.chatFireBaseService.createuserDemo(); 
  }

  getConversationFireBaseDatabase() {
    this.conversation = this.chatFireBaseService.getListConversation(); 
    // console.log(this.conversation);
  }

  arr = Array < any > (); 
  convertArrayConversationUser():Array < string >  {
    this.users.forEach(element =>  {
      element.forEach(res =>  {
        // if (this.cur_user)
        if (this.arr.indexOf(res.fullName) === -1) {
          this.arr.push(res.fullName); 
        }
      })
    }); 
    console.log(JSON.stringify(this.arr)); 
    return this.arr; 
  }

  viewMessagesOrDialogs(item) {
    this.userActive = item;
    this.isViewMes =  ! this.isViewMes; 
  }

  login() {
    let self = this;
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((data) =>  {
      let curUser = this.afAuth.auth.currentUser; 
      self.isLogin = true;
      self.curUser = new User(curUser.uid, curUser.email, curUser.displayName, 
        curUser.photoURL, curUser.photoURL, curUser.email, null, UserRole.customer); 
        self.chatFireBaseService.checkUserExist(self.curUser.userID).on('value', function(snapshot){
        if (!snapshot.exists()) {
          self.addNewUser(self.curUser);
        } else {
          self.curUser = snapshot.val();
          if (self.curUser.type === UserRole.admin || self.curUser.type === UserRole.supporter ){
            self.isViewMes = false; 
          } else {
            self.userActive = self.curUser.conversation;
            self.isViewMes = true;
          }
        }
      }); 
      localStorage.setItem('userLogin', JSON.stringify(self.curUser)); 
    }); 
  }

  logout() {
      this.afAuth.auth.signOut();
      localStorage.removeItem("userLogin");
      this.isLogin = false;
      this.isViewMes = false;
  }

  addNewUser(user) {
    this.chatFireBaseService.addUser(user).then(data =>  {
      this.addNewConversation(user); 
    }); 
  }

  addNewConversation(user) {
    var self = this; 
    let newConversationID = this.genID(); 
    let newMessageID = this.genID(); 
    let currentTime = Math.round(new Date().getTime()/1000); 
    this.chatFireBaseService.getAdminAcc().on('value', function(snapshot) {
      let data = snapshot.val(); 
      let arrAdmin = []; 
      for (let key in data) {
          arrAdmin.push(data[key]); 
      }
      let firstMessage = new Message(newMessageID, "Welcome " + user.fullName + ", willing to help you", null, null, arrAdmin[0].userID, null, currentTime, false); 
      let conversation = new Conversation(newConversationID, {[newMessageID] : firstMessage}); 
      self.chatFireBaseService.addConversation(conversation, user)
    }); ; 
  }
  genID() {
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
  }
}
