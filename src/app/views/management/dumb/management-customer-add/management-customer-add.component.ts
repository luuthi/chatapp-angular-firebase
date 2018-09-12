import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-management-customer-add',
  templateUrl: './management-customer-add.component.html',
  styleUrls: ['./management-customer-add.component.scss']
})
export class ManagementCustomerAddComponent implements OnInit {

  @Output() actionAdd: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
