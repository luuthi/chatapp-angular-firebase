import {Message} from '../model/message'
export class Conversation{
    public conversationID: String;
    public message : Array<Message>;

    constructor(_conversationID : String, _message: Array<Message>){
        this.conversationID = _conversationID;
        this.message = _message;
    }
}