import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { User } from "../../../core/model/user";

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
        let u = new User(
            null,
            'ducdk',
            'Vu Dinh Duc',
            '"https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg"',
            '"https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg"',
            'mail@mail.com',
            null,
            'customer'
        )
        let a = new User(
            null,
            'admin',
            'Admin',
            '"https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg"',
            '"https://lh4.googleusercontent.com/-cKsFy_QHbcU/AAAAAAAAAAI/AAAAAAAACxQ/2DPnv41msTE/photo.jpg"',
            'mail@mail.com',
            null,
            'admin'
        )
        this.db.database.ref("users").push(u);
        this.db.database.ref("users").push(a);
    }
}