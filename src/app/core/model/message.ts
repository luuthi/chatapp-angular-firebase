export class Message {
    public messageID: String;
    public messageContent: String;
    public mediaUrl? : String;
    public mediaThumpnail?: String;
    public senderID : String;
    public picProfile:String;
    public messageTime: Number;
    public isSeen: Boolean;

    constructor(private _messageID: String, private _messContent: String, private _mediaUrl: String, private _mediaThump: String,
                private _senderID: String, private _picProfile: String, private _messTime :Number, private _isSeen: Boolean){
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