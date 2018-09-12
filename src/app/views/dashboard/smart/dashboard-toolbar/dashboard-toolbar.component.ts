import { Component, OnInit, ViewChild, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';
import { TooltipPosition, MatDialog, MatDatepicker } from '@angular/material';
import { ChatService } from '../../../../core/services/chat.service';
import { AddAppointmentDialogsComponent } from '../add-appointment-dialogs/add-appointment-dialogs.component';
import { Overlay } from '@angular/cdk/overlay';
import { DashboarToolbarDatePickerComponent } from '../../dumb/dashboar-toolbar-date-picker/dashboar-toolbar-date-picker.component';
import { ComponentPortal } from '@angular/cdk/portal';
@Component({
  selector: 'app-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.scss']
})
export class DashboardToolbarComponent implements OnInit, OnDestroy, AfterViewInit {
  viewDate: Date = new Date();
  todayDate: Date = new Date();
  view: string = 'day';
  positionOptions: TooltipPosition = 'after';
  activeDayIsOpen: boolean = true;
  dateListener: () => void;

  @ViewChild('dateComponent') dateComponent: any;
  @ViewChild('navCalendar') navCalendar: any;
  // @ViewChild('confirm') confirm:any; 

  constructor(
    private renderer2: Renderer2,
    public chatService: ChatService,
    public dialogs: MatDialog,
    public overlay: Overlay,
  ) {
    console.log('dialogs constructor')
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.dateListener) this.dateListener();
  }

  enterCalendar(event) {
    this.dateComponent.picker.open();
    let dateElement = document.getElementsByTagName('mat-datepicker-content')[0];
    // console.log('dateElement',dateElement);
    this.dateListener = this.renderer2.listen(dateElement, 'mouseleave', () => {
      this.dateComponent.picker.close();
    });
    // this.dateListener = this.renderer2.listen(this.navCalendar.nativeElement, 'mouseleave', () => {
    //   this.dateComponent.picker.close();
    // });
  }

  ngAfterViewInit() {
    // console.log('navbar confirm ready',this.confirm.nativeElement);
    this.chatService.domReady$.emit(true)
  }

  changeDate(ev) {
    if (ev && ev.value) {
      console.log('ev', ev.value);
      console.log('viewDate', this.viewDate);
      this.viewDate = ev.value;
    }
  }
  goCalenderToday() {
    if (this.viewDate.toDateString() != this.todayDate.toDateString()) {
      this.viewDate = this.todayDate;
    }
  }

  openDialog() {
    const dialogRef = this.dialogs.open(AddAppointmentDialogsComponent, {
      height: '450px',
      width: '470px',
      panelClass: 'dialog',
    });

  }
}
