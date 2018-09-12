import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// export interface DialogData {
//   animal: string;
//   name: string;
// }
@Component({
  selector: 'app-add-appointment-dialogs',
  templateUrl: './add-appointment-dialogs.component.html',
  styleUrls: ['./add-appointment-dialogs.component.scss']
})
export class AddAppointmentDialogsComponent implements OnInit {
  public employees =['Hiep','Hoang','Hien','Hoa'];
  constructor(){ }
  
  ngOnInit() {
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
