import { Injectable } from '@angular/core';
import { DashboardStateModule } from '../dashboard-state/dashboard-state.module';

@Injectable({providedIn: DashboardStateModule})
export class DndService {

   
    constructor() {

    }

    checkDuplicateElement(start, long , name, calendar) {
        let currentRange = {
          start,
          end: start + long
        }
    
        let ranges:any[] = calendar
        .filter(item => item.name == name)
        .map(appointment => {
          let appointmentRange = {
            start: appointment.start,
            end: appointment.start + appointment.long
          }
          return {
            customer: appointment.customer,
            name: appointment.name,
            result: this.check2Way(currentRange,appointmentRange)
          }
        });
    
        console.log('ranges',ranges,(ranges.filter(item => item.result)).length);
    
        return (ranges.filter(item => item.result)).length;
        // return false;
      }
    
      check2Way(rangeA,rangeB) {
        return this.checkDuplicateRange(rangeA,rangeB) || this.checkDuplicateRange(rangeB, rangeA)
      }
    
      checkDuplicateRange(rangeA, rangeB) {
        let aStartInRangeB = rangeB.start < rangeA.start && rangeA.start < rangeB.end;
        let aEndInRangeB = rangeB.start < rangeA.end && rangeA.end < rangeB.end;
        return  aStartInRangeB || aEndInRangeB;
      }

      updateNameAndLeft(employeeElement,appointment) {
        console.log("before",appointment);
        let dropName = employeeElement.getAttribute('name');
        let left = employeeElement.getBoundingClientRect().left + window.scrollX;
        appointment.left = left;
        appointment.name = dropName;
        console.log("after",appointment);
        return appointment;
      }
      
      updateTableClass(employeeElement,currentEmployeeElement,renderer2) {
      if (!employeeElement.className.includes('currentTime')) {
        renderer2.addClass(employeeElement,'hover-column');
      }
      if (employeeElement != currentEmployeeElement) renderer2.removeClass(currentEmployeeElement,'hover-column');
      return employeeElement
      }
      resetAppointmentData(appointment,currentAppointment) {
        
        appointment.top = currentAppointment.top;
        appointment.left = currentAppointment.left;
        appointment.start = currentAppointment.start;
        appointment.name = currentAppointment.name;
        
        return appointment;
      }
      
}