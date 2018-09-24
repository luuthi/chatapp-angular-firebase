import { Injectable, EventEmitter, Output } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { User } from "../../../core/model/user";
import { Message } from "../../../core/model/message";
import { Conversation } from "../../../core/model/conversation";
import { UserConversation } from "../../../core/model/user_conversation";
import {UserRole} from '../../../core/constant/enum';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChatFireBaseService {
    user: Observable<any[]>;
    
    constructor(
        public db: AngularFireDatabase,
        public dbft: AngularFirestore
    ) {
    }
    private _listners = new Subject<any>();

    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    logout(){
        this._listners.next();
    }

    getAdminAcc(){
        return this.db.database.ref('users/admin').orderByChild('fullName')
    }

    searchUser(type: String, strSearch: String){
        if (type === UserRole.admin){
            return this.db.database.ref(`users/customer`).orderByChild('fullName')
            .startAt(strSearch.toString()).endAt(strSearch.toString()+"\uf8ff")
        } else if(type === UserRole.customer){
            return this.db.database.ref(`users/admin`).orderByChild('fullName')
            .startAt(strSearch.toString()).endAt(strSearch.toString()+"\uf8ff")
        }
    }

    checkUserExist(_id: String){
        return this.db.database.ref(`users/customer/${_id}`);   
    }

    checkUserAdminExist(_id: String){
        return this.db.database.ref(`users/admin/${_id}`);   
    }

    addUser(user: User){
        return this.db.object(`users/customer/${user.userID}`).set(user);
    }

    addConversation(conversation: Conversation, curUser: User, userChat: User){
        let conversationID = conversation.conversationID;
        this.db.object(`conversation/${conversationID}`).set(conversation).then(data=>{
            let ucCurUser = new UserConversation(conversation.conversationID, "", 0, 
              1, userChat.fullName, userChat.picProfile, userChat.userID, userChat.type);
            let ucChatUser = new UserConversation(conversation.conversationID, "", 0, 
              1, curUser.fullName, curUser.picProfile, curUser.userID, curUser.type);

            this.updateUserConversation(ucCurUser, curUser.userID, conversation.conversationID, curUser.type);
            this.updateUserConversation(ucChatUser, userChat.userID, conversation.conversationID, userChat.type);
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

    updateUserConversation(uc: UserConversation, userID: String, conversationID: String, type: String){
        if(type === UserRole.admin){
            this.db.database.ref(`users/admin/${userID.toString()}/conversation/${conversationID.toString()}`)
            .update(uc);
        } else if(type === UserRole.customer){
            this.db.database.ref(`users/customer/${userID.toString()}/conversation/${conversationID.toString()}`)
            .update(uc);
        }
        
    }

    getListConversation(user: User){
        if(user.type === UserRole.admin){
            return this.db.list(`users/admin/${user.userID}/conversation`).valueChanges();
        } else if(user.type === UserRole.customer){
            return this.db.list(`users/customer/${user.userID}/conversation`).valueChanges();
        }
    }

    getListMessageConversation(conversationID: String, numMess){
        return this.db.database.ref(`conversation/${conversationID}/message`
        ).orderByChild("messageTime").limitToLast(numMess);
    }
}