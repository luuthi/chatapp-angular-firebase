import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth"

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  logout() {
      this.afAuth.auth.signOut();
  }

}
