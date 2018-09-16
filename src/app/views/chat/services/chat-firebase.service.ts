import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";

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
        return this.db.list('user').valueChanges();
    }
}