export class UserConversation{
    public conversationID : String;
    public lastMessage : String;
    public lastTime: Number;
    public unSeenMessage : Number;
    constructor(_conversationID: String, _lastMessage: String, _lastTime:Number, _unSeenMessage: Number){
        this.conversationID = _conversationID;
        this.lastMessage = _lastMessage;
        this.lastTime = _lastTime;
        this.unSeenMessage = _unSeenMessage;
    }
}