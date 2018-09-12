import { Injectable } from '@angular/core';
import { DashboardStateModule } from '../dashboard-state/dashboard-state.module';

@Injectable({providedIn: DashboardStateModule})
export class DomFnService {
   
    constructor() {

    }

    scrollToRed() {
        let redlineElement = document.getElementsByClassName('redline')[0];
        let parentElement = redlineElement.parentElement;
        let listElement = Array.from(document.getElementsByClassName('sidebar-time'));
        let indexOfTarget = listElement.indexOf(parentElement);
        let previousElement = listElement.slice(null,indexOfTarget);
        let RoundHourElements = previousElement.filter(element => element.firstElementChild.hasAttribute('roundHour'));
        let roundHourElement = RoundHourElements[RoundHourElements.length -2];
    
        console.log("redline redlineElement",redlineElement);
        console.log("redline parentElement",parentElement);
        console.log("RoundHourElements",RoundHourElements);
        console.log("roundHourElement",roundHourElement);
        console.log("nextElementSibling",roundHourElement.parentElement);
        roundHourElement.parentElement.scrollIntoView();
      }
      
}