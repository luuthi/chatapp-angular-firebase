export class UserConversation{
    public conversationID : String;
    public lastMessage : String;
    public lastTime: Number;
    public unSeenMessage : Number;
    public userChat: String;
    public userPic: String;
    // public userChatID: String;
    constructor(_conversationID: String, _lastMessage: String, _lastTime:Number, _unSeenMessage: Number,
        _userChat: String, _userPic: String){
        this.conversationID = _conversationID;
        this.lastMessage = _lastMessage;
        this.lastTime = _lastTime;
        this.unSeenMessage = _unSeenMessage;
        this.userChat = _userChat;
        this.userPic = _userPic;
        // this.userChatID = _userChatID;
    }
}