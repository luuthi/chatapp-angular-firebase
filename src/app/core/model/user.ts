export class User {
    public userID:String; 
    public userName:String; 
    public fullName:String; 
    public picProfile:String; 
    public picThumpnail:String; 
    public email:String;
    public conversation : any; 

    constructor (private _userId:String, private _userName:String, private _fullName:String, 
    private _picProfile:String, private _picThumpnail:String, private _email:String, 
    private _conversation : any) {
        this.userID = _userId; 
        this.userName = _userName; 
        this.fullName = _fullName; 
        this.picProfile = _picProfile; 
        this.picThumpnail = _picThumpnail; 
        this.email = _email; 
        this.conversation = _conversation;
    }
}