import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { element } from '@angular/core/src/render3/instructions';
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
    
    constructor() { }

    ngOnInit() {

    }


    
    // onNoClick(): void {
    //   this.dialogRef.close();
    // }
}
