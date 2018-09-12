import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-management-obj-detail',
  templateUrl: './management-obj-detail.component.html',
  styleUrls: ['./management-obj-detail.component.scss']
})
export class ManagementObjDetailComponent implements OnInit {

  @Input() detail;
  isMoveOver: boolean = false;
  isClickedOver: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  moveOverToEdit() {
    this.isMoveOver = true;
  }

  clickOverToEdit() {
    this.isMoveOver = true;
    this.isClickedOver = true;
  }

  moveOutNotEdit() {
    if (!this.isClickedOver) {
      this.isMoveOver = false;
    }
  }

}
