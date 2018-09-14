import { Injectable } from '@angular/core';
import { DashboardStateModule } from '../dashboard-state/dashboard-state.module';

@Injectable({providedIn: DashboardStateModule})
export class TableDataService {

  constructor() {}

  hourPerBlock = 1/4; // 15 min;
  blockHeight = 20; // px for 15 min;
  hourPerMiniBlock = 1/12; // 5 min;
  miniBlockHeight = 20/15*5; // px for 5 min;

    employeeName = ['Hiep', 'Hoang', 'Hung', 'Hoa','Huong','Hang','Hai','Hieu','Hue','Hien'];

    services = {
      1: {
        name: "Manicure"
      },
      2: {
        name: "Pedicure"
      }, 
      3: {
        name: "Foot massage"
      }
    }

    calendar = [
           {
            "name": "Hiep",
            "id": 1,
            "customer": "Jessica Denny",
            "services": [1,2,3],
            "price": "110",
            "start": 13,
            "long": 1.5,
            "height": 160, 
            "top": 960,
            "status": "pending"
          },
           {
            "name": "Hang",
            "id": 4,
            "customer": "Thanh Nguyen",
            "services": [2,1],
            "price": "100",
            "start": 10,
            "long": 2,
            "height": 20, 
            "top": 1520,
            "status": "pending"
          },
        
           {
            "name": "Hoa",
            "id": 3,
            "customer": "Hoang Nguyen",
            "services": [2],
            "price": "50",
            "start": 11,
            "long": 0.75,
            "height": 160, 
            "top": 1200,
            "status": "confirmed"
          },
          {
            "name": "Hung",
            "id": 2,
            "customer": "Trang Nguyen",
            "services": [1,2,3],
            "price": "110",
            "start": 12.5,
            "long": 1,
            "height": 80, 
            "top": 1440,
            "status": "confirmed"
          }
        ];


  getAbsPosition(el){
    var x = 0;
    var y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
    }
    return { top: y, left: x };
};


    caculateCalendar(calendar,width,filterAndOrderAppointment) {
      let calendarAppointments = calendar
      .map(appointment => {
        // console.log('item appointment',appointment)
        let employeeElement:HTMLElement = document.querySelector(`td[name=${appointment.name}]`);
        // console.log('target',employeeElement, employeeElement.getBoundingClientRect().left,employeeElement.offsetLeft);
        // console.log("target",this.getAbsPosition(employeeElement))
        return {
          ...appointment,
          id: appointment.id,
          // left: employeeElement.getBoundingClientRect().left + window.scrollX,
          left: 50 + width*this.employeeName.indexOf(appointment.name),
          top: this.blockHeight * appointment.start / this.hourPerBlock,
          height: this.blockHeight * appointment.long/ this.hourPerBlock
        }
        ;
      })
      
      calendarAppointments = calendarAppointments.sort(filterAndOrderAppointment);
  
      return calendarAppointments;
    }
}