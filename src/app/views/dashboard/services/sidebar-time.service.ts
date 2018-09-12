import { Injectable } from '@angular/core';
import { DashboardStateModule } from '../dashboard-state/dashboard-state.module';
import { interval } from 'rxjs';
import { startWith, map, share } from 'rxjs/operators';

@Injectable({providedIn: DashboardStateModule})
export class SidebarTimeService {

   
    constructor() {

    }
    

    createTimer() {
        return interval(1000).pipe(
            startWith(new Date()),  
            map(tick => new Date()),
            share()
        );
    }

    isSameHour(now,time) {
        let currentHour = now.getHours();  //23 (1)
        let refHour = Math.floor(+time.start);  // 23 = Math.floor(23.75) (2)
        if (currentHour == refHour) {
          return this.isSameQuarter(now.getMinutes(),+time.start)
        }
        else false;
    };
    isSameQuarter(currentMinute,HourAndRefQuater) {
        let currentQuaterCompare15WithMinute = currentMinute/15; // 3.13333 = 47/15
        let currentQuaterCompare15 = Math.floor(currentQuaterCompare15WithMinute); // 3 = Math.floor(3.1333)
        let currentQuater = currentQuaterCompare15 * 0.25; // 0.75 = 3*0.25 (1)
        let refQuarter = HourAndRefQuater - Math.floor(HourAndRefQuater); // 0.75 = 23.75 - Math.floor(23.75) (2)
        if (currentQuater == refQuarter) {
          return true;
        }
        else false;
      }
      
    roundHour(number) {
    let result = +number - Math.floor(+number);
    return result == 0
    }
}