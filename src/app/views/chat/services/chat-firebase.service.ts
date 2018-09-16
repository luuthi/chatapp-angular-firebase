import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { User } from "../../../core/model/user";
import { Message } from "../../../core/model/message";
import { Conversation } from "../../../core/model/conversation";
import { UserConversation } from "../../../core/model/user_conversation";
import { callbackify } from "util";

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

    checkUserExist(_id: String, callback: Function){
        return this.db.database.ref(`users/${_id}/userID`).once('value', snapshot=>{
            if(!snapshot.exists()){
                callback();
            }
        });   
    }

    addUser(user: User){
        return this.db.object(`users/${user.userID}`).set(user);
    }

    addConversation(conversation: Conversation, user: User){
        this.db.database.ref("conversation").push(conversation).then(data=>{
            let currentTime = Math.round(new Date().getTime() / 1000);
            let userConversation = new UserConversation(conversation.conversationID, "", currentTime, 0);
            this.db.object(`users/${user.userID}/conversation`).update(userConversation);
        })
    }

    getListConversation(){
        return this.db.list('conversation').valueChanges();
    }

    createuserDemo(){
        let u_c = new UserConversation('1', 'Test Message 3', 1537084640, 2);
        let u = new User(
            null,
            'ducdk',
            'Vu Dinh Duc',
            '"https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg"',
            '"https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg"',
            'mail@mail.com',
            [
                u_c 
            ],
            'customer'
        )
        let a = new User(
            null,
            'admin',
            'Admin',
            '"https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg"',
            '"https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg"',
            'mail@mail.com',
            [
                u_c
            ],
            'admin'
        )
        this.db.database.ref("users").push(u);
        this.db.database.ref("users").push(a);
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