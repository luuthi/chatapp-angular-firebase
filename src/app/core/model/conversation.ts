import {Message} from '../model/message'
export class Conversation{
    public conversationID: String;
    public message : any;

    constructor(_conversationID : String, _message: any){
        this.conversationID = _conversationID;
        this.message = _message;
    }
}