import {User} from '../model/user'
export class Conversation{
    public conversationID: String;
    public member : Array<User>;
    public lastMessageSent : String;
    public lastMessageTime : Number;

    constructor(private _conversationID : String, private _member : Array<User>, 
                private _lastMessageSent : String, private _lastMessageTime: Number){
        this.conversationID = _conversationID;
        this.member = _member;
        this.lastMessageSent = _lastMessageSent;
        this.lastMessageTime = _lastMessageTime;
    }
}