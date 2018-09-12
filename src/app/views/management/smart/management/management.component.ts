import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class ManagementComponent implements OnInit,AfterViewInit {

  menuActive: string = 'customer';
  nameContent: string = 'Khách hàng (265)';
  selectedPersone;
  menuStaff: string = 'detail';
  isClickedOver: boolean = false;
  isMoveOver: boolean = false;
  isShowAdd: boolean = false;
  isClickedAdd: boolean = false;
  constructor(private _eref: ElementRef,private chatService: ChatService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chatService.domReady$.emit(true);
    if (!this.chatService.status.chat.value) {this.chatService.toggleItem({name:''});}
   
  }

  // main menu event click
  clickMainMenu(val) {
    this.menuActive = val;
    this.selectedPersone = '';
    this.changeContent();
  }

  // change main content
  changeContent() {
    if (this.menuActive == 'customer') {
      this.nameContent = 'Khách hàng (265)';
    } else if (this.menuActive == 'staff') {
      this.nameContent = 'Nhân viên (14)';
    } else if (this.menuActive == 'service') {
      this.nameContent = 'Dịch vụ';
    } else if (this.menuActive == 'config') {
      this.nameContent = 'Cài đặt chung';
    } else if (this.menuActive == 'subscribe') {
      this.nameContent = 'Subscribe/Nâng cấp';
    }
  }

  clickMenuStaff(val) {
    this.menuStaff = val;
  }

  // view detail customer/staff
  viewDetail(val) {
    this.selectedPersone = val;
  }

  onClick(event) {
    // console.log('target',event.target);
    // console.log('closest',event.target.closest);
    // console.log('closest content--detail',event.target.closest(".content--detail"));
    if (event.target.closest(".content--detail")) {
      this.isMoveOver = true;
    } else {
      this.isMoveOver = false;
      this.isClickedOver = false;
    }
  }

  actionAdd() {
    this.isClickedAdd = true;
    this.isShowAdd = !this.isShowAdd;
  }

}
