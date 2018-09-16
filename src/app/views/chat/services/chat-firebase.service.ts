import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";

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

    getListConversation(){
        return this.db.list('conversation').valueChanges();
    }

    createDataDemo(){
        let user = {
            email: "mail@mail.com",
            username: "ducdk",
        }
        return this.db.database.ref("users").push(user);
    }
}