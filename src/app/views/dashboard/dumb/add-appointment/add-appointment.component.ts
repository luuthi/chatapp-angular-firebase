import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  status = {
    pending:{
      name: 'pending',
      value: true
    },
    confirmed:{
      name: 'confirmed',
      value: false
    },
    late:{
      name: 'late',
      value: false
    },
    paid:{
      name: 'paid',
      value: false
    }
  }
  public employees = ['Hiep', 'Hoang', 'Hien', 'Hoa'];
  public services = ['Manicure', 'Pedicure', 'Dippling Powder'];

  appointmentForm: FormGroup = this.fb.group({
    employee: ['',Validators.required],
    service: ['',Validators.required]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setForm();
  }


  setForm() {
    
  }

  checkKeyPress(event){
    console.log('keypress', event.keyCode);
    if (event.keyCode != 8 && event.keyCode != 0 && (event.keyCode < 48 || event.keyCode > 57)) {
      return false;
    }
  }

  toggleButton(event){
    Object.keys(this.status).forEach(key => {
      console.log(key)
      if (key == event) this.status[key].value = true;
      else this.status[key].value = false;
    })
  }

}
