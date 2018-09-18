import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { User } from "../../../core/model/user";
import { Message } from "../../../core/model/message";
import { Conversation } from "../../../core/model/conversation";
import { UserConversation } from "../../../core/model/user_conversation";
import {UserRole} from '../../../core/constant/enum';

@Injectable({
    providedIn: 'root'
})

export class ChatFireBaseService {
    user: Observable<any[]>;
    
    constructor(
        public db: AngularFireDatabase
    ) {
    }

    getUser(){
        return this.db.list('users').snapshotChanges().pipe(
            map(actions => {
                return actions.map( c => ({ key: c.payload.key, ...c.payload.val() }));
            })
        )
    }

    getAdminAcc(){
        return this.db.database.ref('users').orderByChild('type')
        .startAt(UserRole.admin).endAt(UserRole.admin)
    }

    checkUserExist(_id: String,){
        return this.db.database.ref(`users/${_id}`);   
    }

    addUser(user: User){
        return this.db.object(`users/${user.userID}`).set(user);
    }

    addConversation(conversation: Conversation, user: User){
        let conversationID = conversation.conversationID;
        this.db.object(`conversation/${conversationID}`).set(conversation).then(data=>{
            let currentTime = Math.round(new Date().getTime() / 1000);
            let userConversation = new UserConversation(conversation.conversationID, "", currentTime, 0);
            this.db.object(`users/${user.userID}/conversation`).update(userConversation);
        })
    }

    addMessage(message: Message, conversationID: String){
        this.db.database.ref(`conversation/${conversationID}/message`)
        .child(message.messageID.toString()).set(message);
    }

    seenMessage(messageID: String, conversationID: String){
        this.db.database.ref(`conversation/${conversationID}/message/${messageID}`)
        .child("isSeen").set(true);
    }

    getListConversation(){
        return this.db.list('conversation').valueChanges();
    }

    getListMessageConversation(conversationID: String){
        return this.db.list(`conversation/${conversationID}/message`).valueChanges();
    }

    createuserDemo(){
        let u_c = new UserConversation('8eig2pdkr82doakhnlofl6', 'Welcome thi lưu, willing to help you', 1537084640, 2);
        let user = new User(
            'HNErJhopeqbOTBfRE8fDocLK1FC5',
            'admin',
            'Admin',
            '"https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg"',
            '"https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg"',
            'mail@mail.com',
            [
                u_c
            ],
            'admin'
        );
        this.db.object(`users/${user.userID}`).set(user);
    }
    
    createConversationDemo(){
        let mes1 = new Message('123', 'Test Message', null, null, '-LMWM5-98dtBiNUAq3bA', 'https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg', 1537084640, true);
        let mes2 = new Message('124', 'Test Message 1', null, null, '-LMWM5-EbfFQw_8ngpk1', 'https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg', 1537084640, true);
        let mes3 = new Message('124', 'Test Message 2', null, null, '-LMWM5-98dtBiNUAq3bA', 'https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg', 1537084640, true);
        let mes4 = new Message('124', 'Test Message 3', null, null, '-LMWM5-EbfFQw_8ngpk1', 'https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg', 1537084640, true);

        let conversation = new Conversation('1', [mes1, mes2, mes3, mes4])
        this.db.database.ref("conversation").push(conversation);
    }
}