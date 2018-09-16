import {NgModule }from '@angular/core'; 
import {CommonModule }from '@angular/common'; 
import {BrowserModule }from '@angular/platform-browser'; 
import {BrowserAnimationsModule }from '@angular/platform-browser/animations'; 

import {ChatComponent }from './smart/chat/chat.component'; 
import {ChatDialogsComponent }from './smart/chat-dialogs/chat-dialogs.component'; 
import {ChatDialogsItemComponent }from './dumb/chat-dialogs-item/chat-dialogs-item.component'; 
import {ChatMessagesComponent }from './smart/chat-messages/chat-messages.component'; 
import {ChatMessagesItemComponent }from './dumb/chat-messages-item/chat-messages-item.component'; 
import {MatCardModule, MatListModule, MatInputModule, MatTooltipModule, MatButtonModule }from '@angular/material'; 
import {ChatRoutingModule }from './chat-routing.module';
import {environment}from '../../../environments/environment';
import { ChatFireBaseService } from './services/chat-firebase.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule( {
  imports:[
    CommonModule, 
    BrowserModule, 
    BrowserAnimationsModule, 
    MatCardModule, 
    MatListModule, 
    MatInputModule, 
    MatTooltipModule, 
    MatButtonModule, 
    ChatRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase, 'demo-chat')
    ], 
  declarations:[ChatComponent, ChatDialogsComponent, ChatDialogsItemComponent, ChatMessagesComponent, ChatMessagesItemComponent], 
  exports:[ChatComponent],
  providers: [ChatFireBaseService],
})
export class ChatModule {}
