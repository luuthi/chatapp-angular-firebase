export class Message {
    public messageID: String;
    public messageContent: String;
    public mediaUrl? : String;
    public mediaThumpnail?: String;
    public senderID : String;
    public picProfile?:String;
    public messageTime: Number;
    public isSeen: Boolean;

    constructor( _messageID: String,  _messContent: String,  _mediaUrl: String,  _mediaThump: String,
                 _senderID: String,  _picProfile: String,  _messTime :Number,  _isSeen: Boolean){
                    this.messageID = _messageID;
                    this.messageContent = _messContent;
                    this.mediaUrl = _mediaUrl;
                    this.mediaThumpnail = _mediaThump;
                    this.senderID = _senderID;
                    this.picProfile =_picProfile;
                    this.messageTime = _messTime;
                    this.isSeen =_isSeen;
    }
}