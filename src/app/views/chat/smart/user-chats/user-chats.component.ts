import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ChatFireBaseService } from '../../services/chat-firebase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../../core/model/user';
import { UserRole } from '../../../../core/constant/enum';

@Component({
  selector: 'app-user-chats',
  templateUrl: './user-chats.component.html',
  styleUrls: ['./user-chats.component.scss'],
  animations: [
    trigger('flyInFade', [
      state('true' , style({transform: 'translateX(0)', display: 'block'})),
      state('false', style({transform: 'translateX(50%)', display: 'none'})),
      transition('* => *', animate('0.3s ease-in-out')),
    ])
  ],
})
export class UserChatsComponent implements OnInit {
  @Output() actionBack: EventEmitter<any> = new EventEmitter();
  @Output() onClickUser: EventEmitter<any> = new EventEmitter();
  @Input() curUser : User;
  @Input() flyInFade: boolean = false;

  listUser: Array<any> = [];
  frmSearchUser: FormGroup;
  strSearch : String;
  isShowClear: boolean = false;
  noData: boolean = false;

  constructor(private chatFirebaseService: ChatFireBaseService) { }

  ngOnInit() {
    this.frmSearchUser = new FormGroup({
      userSearch: new FormControl(''),
    });
    let self = this;
    if (this.curUser.type === UserRole.customer){
      this.chatFirebaseService.getAdminAcc().on('value', function(snapshot){
        let data = snapshot.val();
        self.listUser = [];
        for (let key in data){
          self.listUser.push(data[key]);
        }
      });
    }
  }
  onChange(form: FormGroup){
    if(form.value.userSearch !== ""){
      this.isShowClear = true;
      this.searchUser(form);
    } else{
      this.isShowClear = false;
      this.listUser = [];
      this.noData = false;
    }
  }

  clearSearch(form: FormGroup){
    form.controls.userSearch.setValue("");
    this.listUser = [];
  }

  clickUser(user: any, form: FormGroup){
    this.onClickUser.emit(user);
  }

  searchUser(form: FormGroup){
    let self = this;
    this.strSearch = form.value.userSearch;
    this.chatFirebaseService.searchUser(this.curUser.type, this.strSearch).on('value', function(snapshot){
      let data = snapshot.val();
      self.listUser = [];
      for (let key in data){
        self.listUser.push(data[key]);
      }
      if (self.listUser.length == 0){
        self.noData = true;
      }else {
        self.noData = false;
      }
    });
  }

}
