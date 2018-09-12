import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboar-toolbar-date-picker',
  templateUrl: './dashboar-toolbar-date-picker.component.html',
  styleUrls: ['./dashboar-toolbar-date-picker.component.scss']
})
export class DashboarToolbarDatePickerComponent implements OnInit,AfterViewInit {
  @ViewChild('picker') public picker;
  @Output() actionChangeDate: EventEmitter<any> = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log("after view init")

  }
}
