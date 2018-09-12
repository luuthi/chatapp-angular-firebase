import { Injectable } from '@angular/core';
import { DashboardStateModule } from '../dashboard-state/dashboard-state.module';
import { Edges, ResizeEvent } from 'angular-resizable-element';
import { TableDataService } from './table-data.service';

@Injectable({providedIn: DashboardStateModule})
export class ResizeService {

   
    constructor(private tableDataService: TableDataService) {

    }

    filterAndOrderAppointment(a,b) {
        if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
          return 1
        } 
        else {
          if (a.start < b.start) return -1
          if (a.start > b.start) return 1
          else return 0
        }
      }
      reCaculateStartEndTime(newStart,newEnd, directionAndRatio ,editPosition, caculateUnit) {
 
        if (editPosition === 'top') {
          if (directionAndRatio.direction === 'up') {
            newStart -= directionAndRatio.ratio * caculateUnit;
          }
          if (directionAndRatio.direction === 'down') {
            newStart += directionAndRatio.ratio * caculateUnit;
          }
          // console.log("newStart after modify",newStart)
        }
    
        else {
          if (directionAndRatio.direction === 'up') {
            newEnd -= directionAndRatio.ratio * caculateUnit;
          }
          if (directionAndRatio.direction === 'down') {
            newEnd += directionAndRatio.ratio * caculateUnit;
          }
          // console.log("newEnd after modify",newEnd)
        }
    
        return {newStart,newEnd}
      }
      fromNumberToTimeString(number) {
        let hour = Math.floor(number);
        let minute = (number - Math.floor(number))*60;
        minute = Math.round(minute);
        let a = hour < 12 ? 'am':'pm';
        return `${hour <= 12 ? hour: hour - 12 }:${minute >= 10 ? minute : "0" + minute.toString()} ${a}`
      }
    
      convertTimeToString(start,end) {
        let startTime = this.fromNumberToTimeString(start);
        let endTime = this.fromNumberToTimeString(end);
        let totalMin = Math.round((end - start)*60);
        return {
          start: startTime,
          end: endTime,
          total: totalMin
        }
      }

         /**
   * Tính toán hướng lên hay xuống và kéo được mấy ô để cho dự đoán cộng hay trừ thời gian
   */
  caculateReizeRatio(edge:Edges,compareDistance) {
    // console.log('edge',edge)
    let distance;
    if (edge.top) distance =+edge.top
    else distance =+edge.bottom
    distance = 0 - distance;
    let direction;
    if (distance < 0) direction = 'down'
    else if (distance > 0) direction = 'up'
    else direction = 'hold';
    let ratio = Math.round(Math.abs(distance) / compareDistance);
    return {direction,ratio}
  }

  checkOverLapNextElement(calendar,employeeData,elementBottom,name) {
        let suspectAppointments = calendar
        .filter(appointment => appointment.name == name)
        .sort(this.filterAndOrderAppointment);
        
        let currentElementIndexInSepects = suspectAppointments.indexOf(employeeData)
        let suspectAppointment = suspectAppointments[currentElementIndexInSepects+1];
        // console.log('currentElementIndexInSepects',currentElementIndexInSepects, suspectAppointments,suspectAppointment)
        
        if (suspectAppointment) {
          let nextElementId = suspectAppointment.id;
          let nextElementSibling = document.getElementById(`appointment-${nextElementId}`);
          console.log('nextElement',nextElementSibling)
          let nextElementSiblingTop = nextElementSibling ? +nextElementSibling.getAttribute('top'):0;
          let nextElementSiblingBottom = nextElementSibling ? +nextElementSibling.getAttribute('bottom'):0;
          console.log('overlaping..',nextElementSiblingTop,elementBottom,nextElementSiblingBottom)
          return nextElementSiblingTop < elementBottom && elementBottom < nextElementSiblingBottom;
        } else {
          return false;
          // console.log('it ok now, no nextSibling')
        }
  }

}