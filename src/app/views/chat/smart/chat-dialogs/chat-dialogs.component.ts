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

  // users:any; 
  conversation:Observable < any[] > ; 
  curUser: User; 
  isViewUserList: boolean = false;
  userActive: any;

  constructor(
    public chatFireBaseService:ChatFireBaseService, 
    public afAuth:AngularFireAuth) {
      this.chatFireBaseService.listen().subscribe((m:any) => {
        this.logout();
    })
    }

  ngOnInit() {
    this.getUserLocal();
  }

  getUserLocal(){
    let data = localStorage.getItem("userLogin");
    if (data != undefined || data != null){
      this.curUser = JSON.parse(data);
      this.isViewMes = false;
      this.updateUserLocal(this.curUser);
      this.getConversationByUser(this.curUser);
      this.isLogin = true;
    }else{
      this.curUser = null;
      this.isLogin = false;
    }
  }
  updateUserLocal(curUser: User){
    let self = this;
    if(curUser.type === UserRole.customer){
      this.chatFireBaseService.checkUserExist(curUser.userID).on('value', function(snapshot){
        let data = snapshot.val();
        localStorage.setItem("userLogin", JSON.stringify(data));
      });
    } else if(curUser.type === UserRole.admin){
      this.chatFireBaseService.checkUserAdminExist(curUser.userID).on('value', function(snapshot){
        let data = snapshot.val();
        localStorage.setItem("userLogin", JSON.stringify(data));
      });
    }
  }

  viewUserList(){
    this.isViewUserList = !this.isViewUserList;
  }


  getConversationByUser(user: User) {
    this.conversation = this.chatFireBaseService.getListConversation(user); 
    // console.log(this.conversation);
  }

  viewMessagesOrDialogs(item) {
    if (!this.isViewMes){
      this.userActive = item;
    }
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
          self.chatFireBaseService.checkUserAdminExist(self.curUser.userID).on('value', function(snapshot){
            if (!snapshot.exists()) {
              self.addNewUser(self.curUser);
            }else {
              self.curUser = snapshot.val();
              self.getConversationByUser(self.curUser);
              self.isViewMes = false;
              localStorage.setItem("userLogin", JSON.stringify(self.curUser));
            }
          })
          
        } else {
          self.curUser = snapshot.val();
          self.getConversationByUser(self.curUser);
          self.isViewMes = false;
          localStorage.setItem("userLogin", JSON.stringify(self.curUser));
        }
      }); 
    }); 
  }

  logout() {
      this.afAuth.auth.signOut();
      localStorage.removeItem("userLogin");
      this.isLogin = false;
      this.isViewMes = false;
  }

  addNewUser(user) {
    this.chatFireBaseService.addUser(user);
  }

  startConversation(userChat: any){
    console.log(userChat);   
    console.log(this.curUser); 
    let userInfo = null;
    for(let key in this.curUser.conversation){
      let conversation = this.curUser.conversation[key];
      if (userChat.userID === conversation.userID){
        userInfo = JSON.parse(JSON.stringify(conversation));
        break;
      }
    }
    if (userInfo === null){
      //case 2 acc dont have conversation
      // create new conversation
      let newConvID = this.genID();
      let newMessageID = this.genID(); 
      let currentTime = Math.round(new Date().getTime()/1000);
      let conv = new Conversation(newConvID, {})
      this.chatFireBaseService.addConversation(conv, this.curUser, userChat);
      userInfo = {
        conversationID: newConvID,
        lastMessage: "",
        lastTime: currentTime,
        type: userChat.type,
        unSeenMessage : 0,
        userChat: userChat.fullName,
        userID: userChat.userID,
        userPic: userChat.picProfile
      }
      this.curUser.conversation = userInfo;
    }
    /// load message
    this.userActive = userInfo;
    this.isViewMes = true;
    this.isViewUserList = false;
    // this.userActive = userChat;
  }
  genID() {
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); 
  }
}
