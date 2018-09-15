export class User_Conversation{
    public userID:String;
    public conversationID :String;
    public unSeenMessage : Number;
    constructor(private _userID: String, private _conversationID: String, private _unSeenMess: Number){
        this.userID = _userID;
        this.conversationID = _conversationID;
        this.unSeenMessage = _unSeenMess;
    }
}