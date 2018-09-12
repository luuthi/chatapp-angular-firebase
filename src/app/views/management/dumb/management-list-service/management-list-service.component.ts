import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management-list-service',
  templateUrl: './management-list-service.component.html',
  styleUrls: ['./management-list-service.component.scss']
})
export class ManagementListServiceComponent implements OnInit {

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  constructor() { }

  ngOnInit() {
  }

}
