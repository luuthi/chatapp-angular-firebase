import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PeriodicElement {
    start: number;
  }
  
export function initTimeSlot() {
let arr:any = [];
let start = 0;
while (start < 24) {
    arr.push({start: start, display: !!!(start - Math.floor(start))})
    start = start + 0.25;
}
return arr
}

const timeSlots: PeriodicElement[] = initTimeSlot()

export class ExampleDataSource extends DataSource<PeriodicElement> {
/** Stream of data that is provided to the table. */
data = new BehaviorSubject<PeriodicElement[]>(timeSlots);

/** Connect function called by the table to retrieve one stream containing the data to render. */
connect(): Observable<PeriodicElement[]> {
    return this.data;
}

disconnect() {}
}