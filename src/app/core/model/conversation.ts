import {Message} from '../model/message'
export class Conversation{
    public conversationID: String;
    public message : Array<Message>;

    constructor(private _conversationID : String, private _member : Array<User>, 
                private _lastMessageSent : String, private _lastMessageTime: Number){
        this.conversationID = _conversationID;
    }
}