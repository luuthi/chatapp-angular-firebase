export class User {
    public userID:String; 
    public userName:String; 
    public fullName:String; 
    public picProfile:String; 
    public picThumpnail:String; 
    public type:String; 
    public email:String;
    public conversation : any; 

    constructor (
        _userId:String, 
        _userName:String, 
        _fullName:String, 
        _picProfile:String, 
        _picThumpnail:String, 
        _email:String, 
        _conversation : any, 
        _type: String
        ) {
        this.userID = _userId; 
        this.userName = _userName; 
        this.fullName = _fullName; 
        this.picProfile = _picProfile; 
        this.picThumpnail = _picThumpnail; 
        this.email = _email; 
        this.conversation = _conversation;
        this.type = _type;
    }
}