import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth"
import { ChatFireBaseService } from '../../services/chat-firebase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private _chatFirebaseService: ChatFireBaseService) { }

  ngOnInit() {
  }
  clickLogout() {
      this._chatFirebaseService.logout();
  }


}
