import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChatFireBaseService } from '../../services/chat-firebase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(
    public chatFireBaseService: ChatFireBaseService
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
    this.chatFireBaseService.createDataDemo();
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

}
