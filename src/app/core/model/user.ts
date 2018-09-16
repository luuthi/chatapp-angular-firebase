export class User {
    // public userID:String; 
    // public userName:String; 
    // public fullName:String; 
    // public picProfile:String; 
    // public picThumpnail:String; 
    // public type:String; 
    // public email:String;
    // public conversation : any; 

    constructor (
        private userId:String, 
        private userName:String, 
        private fullName:String, 
        private picProfile:String, 
        private picThumpnail:String, 
        private email:String, 
        private conversation : any, 
        private type: String
    ) {
        this.userId = this.userId; 
        this.userName = this.userName; 
        this.fullName = this.fullName; 
        this.picProfile = this.picProfile; 
        this.picThumpnail = this.picThumpnail; 
        this.email = this.email; 
        this.conversation = this.conversation;
        this.type = this.type;
    }

    object(){
        return;
    }
}