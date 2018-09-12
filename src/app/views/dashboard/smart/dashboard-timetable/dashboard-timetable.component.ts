import { Component, OnInit, ChangeDetectorRef, Renderer2, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { ResizeEvent, Edges } from 'angular-resizable-element';
import { map,take, delay, distinctUntilChanged, auditTime, pairwise, tap,  filter,  last} from 'rxjs/operators';
import {  TableDataService } from '../../services/table-data.service';
import { ExampleDataSource } from './table-config';
import { SidebarTimeService } from '../../services/sidebar-time.service';
import { DndService } from '../../services/dnd.service';
import { ResizeService } from '../../services/resize.service';
import { DomFnService } from '../../services/dom-fn.service';

@Component({
  selector: 'app-dashboard-timetable',
  templateUrl: './dashboard-timetable.component.html',
  styleUrls: ['./dashboard-timetable.component.scss']
})

export class DashboardTimetableComponent  implements OnInit,AfterViewInit {
  resizeResult:{newStart:number, newEnd: number, key: string};
  
  isLoading: boolean = true;

  draggingOpacity: number = 1;
  currentAppointment: any = {};
  appointmentStyle: any = {
    width: 0
  };
  draggingElementEvent$: Observable<any>;
  isDraggingId;

  calendar:any[] = [];

  draggingElement$: BehaviorSubject<Element>;
  draggingEvent$: BehaviorSubject<any>;
  resizing$: BehaviorSubject<any>;
  draggingText$: BehaviorSubject<any>;
  animation$:any;
  move$:Observable<any>;
  smoothMove$: Subscription;
  startDragLocation;
  openTime: number = 9;
  dataTransfer:any;
  @ViewChild('timetable2') public timetable2 : ElementRef;
  @ViewChild('redline') public redline;
  scrollBarWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let windowWidth = event.target.innerWidth;
    console.log('resize event', windowWidth, event);
    this.widthUpdateOnResize(this.calendar);
  }

  tableReady = false;
  
  employeeName = this.tableDataService.employeeName;
  
  displayedColumns: string[] = [
    'date',...this.employeeName,'scrollbar'
  ];

  displayedDataColumns: string[] = [];
  
  constructor(
    public cd: ChangeDetectorRef, 
    public renderer2 : Renderer2,
    public tableDataService: TableDataService,
    public sidebarTimeService: SidebarTimeService,
    public dndService: DndService,
    public resizeService: ResizeService,
    public domFnService: DomFnService
  ){

    // TODO: need test on MAC about cell data
    // if (this.isWindows()) {
      this.displayedDataColumns= [
        'date',...this.employeeName
      ];
    // } else {
    //   this.displayedDataColumns  = this.displayedColumns;
    // }
  }

 

  dataSource = new ExampleDataSource();

  currentTime$ = this.sidebarTimeService.createTimer();


  
  dragStart(ev, name, i) {
    this.cd.detach();
    this.isDraggingId = i;
    let appointment = this.calendar[i];
    // make ghost element on dragging invisible
    var crt = ev.target.cloneNode(true);
    crt.style.backgroundColor = "red";
    crt.style.opacity = 0; /* or visibility: hidden, or any of the above */
    document.body.appendChild(crt);
    if (ev.dataTransfer.setDragImage) ev.dataTransfer.setDragImage(crt, 0, 0);
    else {
      this.calendar[i].opacity = 0.2;
    }
 
    // console.log('current ev',ev)
    // change color element;
    this.renderer2.addClass(ev.target,'active-dragging-element');

    // creating remedyY pixel
    this.currentAppointment = {
      pageY: ev.pageY, 
      pageX: ev.pageX,
      elementPosWithWindowX: ev.target.getBoundingClientRect().left + window.scrollX,
      elementPosWithWindowY: ev.target.getBoundingClientRect().top + window.scrollY,
      i,
      start: appointment.start,
      name: appointment.name,
      long: appointment.long,
      top: appointment.top,
      left: 50 + this.appointmentStyle.width *this.employeeName.indexOf(name)
    };

    // console.log('start',this.currentAppointment)

    this.currentAppointment['remedyX'] = this.currentAppointment.pageX - this.currentAppointment.elementPosWithWindowX
    this.currentAppointment['remedyY'] = this.currentAppointment.pageY - this.currentAppointment.elementPosWithWindowY



    // khởi tạo employee element hiện tại 
    let currentEmployeeElement =  document.elementFromPoint(ev.pageX,100);
    this.draggingElement$ = new BehaviorSubject(currentEmployeeElement);
    
    // quan sát sự thay đổi vị trí cột employee
    this.draggingElement$.pipe(
      distinctUntilChanged(),
      filter(element => !element.className.includes('currentTime'))
    ).subscribe(employeeElement => {
      this.calendar[i] = this.dndService.updateNameAndLeft(employeeElement,appointment);
      currentEmployeeElement = this.dndService.updateTableClass(employeeElement,currentEmployeeElement,this.renderer2);
      // this.cd.detectChanges();

    })
    
    // quan sát sự thay đổi toa do
    this.draggingEvent$ = new BehaviorSubject(ev);
    this.draggingText$ = new BehaviorSubject('');
  
    let time = 130;
    this.move$ = this.draggingEvent$
    .pipe(
      auditTime(time), // limit time return event
      filter((coordinate) => coordinate.pageX != 0),// filter every reset point back to zero
      map(event => {
        return {
          remedyY: event.pageY - this.currentAppointment.remedyY,
          remedyX: event.pageX - this.currentAppointment.remedyX,
          pageY: event.pageY,
          pageX: event.pageX,
          event
        }
      }), // remove remedyY space between cursor and item
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), // dinstice object
      pairwise(), // take 2 event nearest
      map(([last, now]) => {
        let height;
        let hourPerStep;

        // console.log('now',now.event)
        
        let top = appointment.top;
        let elementPosWithWindowY = now.event.target.getBoundingClientRect().top + window.scrollY; // get current element compare to window
        let elementPosWithWindowX = now.event.target.getBoundingClientRect().left + window.scrollX;
      
        height = this.tableDataService.blockHeight;
        hourPerStep = this.tableDataService.hourPerBlock;
        appointment.background = '#1b5e20';

        let deltaY = now.remedyY - elementPosWithWindowY;
        let previousElement = document.elementFromPoint(elementPosWithWindowX, elementPosWithWindowY-19);
        let previousElementBottom = previousElement ? +previousElement.getAttribute('bottom'):0;
        
        let isNearPreviousElement = previousElementBottom%height != 0 &&  top + deltaY <= Math.ceil(previousElementBottom/height)*height; 
        let cannotMoveUp = Math.ceil(top/height-1)*height < previousElementBottom;
        // console.log('cacultate previous element',previousElement)
        // console.log('cannotMoveUp...',top,Math.ceil(top/height-1)*height,previousElementBottom);
        if (isNearPreviousElement && cannotMoveUp) {
          deltaY = previousElementBottom - top;
          // console.log('snaping to previous element mode')
        }  

        let nextElement = document.elementFromPoint(elementPosWithWindowX, elementPosWithWindowY + appointment.height + 19);
        let nextElementTop = nextElement ? +nextElement.getAttribute('top'):0;
        let currentBottom = top + appointment.height;

        let isNearNextElement = nextElementTop%height != 0 &&  currentBottom + deltaY <= Math.ceil(nextElementTop/height)*height; 
        let cannotMoveDown = Math.ceil(top/height+1)*height < nextElementTop;
        console.log('cacultate next element',nextElement, nextElementTop%height != 0,currentBottom + deltaY,nextElementTop, Math.ceil(nextElementTop/height)*height )
        console.log('cannotMoveDown...',cannotMoveDown,top,Math.ceil(top/height+1)*height,nextElementTop);
        if (isNearNextElement && cannotMoveDown) {
          deltaY = nextElementTop - currentBottom;
          // console.log('snaping to next element mode')
        }  


        // else {
        //   console.log('normal mode');
        //   console.log('isNearPreviousElement && cannotMoveUp',isNearPreviousElement,cannotMoveUp)
        // }
        

        return {
          deltaY: deltaY,
          deltaX: now.remedyX - elementPosWithWindowX,
          pageX: now.pageX,
          top,
          height,
          hourPerStep,
          isNearPreviousElement,
          isNearNextElement,
          event: now.event
        }
      }),
      map(({ deltaX, deltaY,top,pageX,height,hourPerStep,isNearPreviousElement,isNearNextElement,event}) => {

        // for updating column
        let oneColumnElement = <HTMLElement>document.getElementsByClassName('employee-name')[0];
        let halfOfColumnWidth = oneColumnElement.offsetWidth/2;

        // only update position base on mouse distance (now is base on mouse position)
        // if (Math.abs(deltaX) > halfOfColumnWidth) {
          let currentEmployeeElement =  document.elementFromPoint(pageX,100);
          this.draggingElement$.next(currentEmployeeElement);
        // }
        // end updating column

        let moveBlock;
        let newBlock;
        let currentBlock;
        currentBlock = Math.round(top/height);
        moveBlock = Math.round(deltaY/height);

        if (isNearPreviousElement || isNearNextElement) {
          moveBlock = deltaY/height;
          // console.log('move block is detail',moveBlock)
        } else {
          // console.log('move block is normal',moveBlock)
        }

        if (moveBlock == 0) {
          newBlock = currentBlock;
          // console.log('nothing moving,deltaY', deltaY);
          
        } else {
          // console.log(`moving ${moveBlock} block`)
          newBlock = currentBlock + moveBlock;
        }

        return {height,hourPerStep,newBlock,event}
      }),
      filter(({moveBlock}) => {
        return moveBlock != 0
      }),
      map(({height,hourPerStep,newBlock}) => {
        let newTop;
        let newHour;
        newTop = newBlock*height
        newHour = newBlock*hourPerStep
        return { newTop,newHour }
      }),
      map(({newTop,newHour}) => {
        appointment.start = newHour;
        appointment.top = newTop; 
        let ghostElement = document.getElementsByClassName('textTime')[0];
        console.log('ghostElement',ghostElement);
        if (ghostElement) {
          
          let timeString = this.resizeService.convertTimeToString(appointment.start,appointment.start + appointment.long);
          // let nodeValue = document.createTextNode(`start: <strong>${timeString.start}</strong> </br> end: <strong>${timeString.end}</strong> </br> (${timeString.total} mins)`);
          // ghostElement.replaceChild(nodeValue,ghostElement.childNodes[0]);
          ghostElement.innerHTML = `Start: <strong>${timeString.start}</strong> </br> End: <strong>${timeString.end}</strong> </br> (${timeString.total} mins)`;
        }

        // debugger;
        
        this.cd.detectChanges();
        return {newHour  };
      }),
      last()
    )

    this.move$.subscribe(
      ({newHour}) => {
        let duplicate = this.dndService.checkDuplicateElement(newHour,this.currentAppointment.long,this.calendar[i].name, this.calendar);
        if (duplicate) {
          alert('cuộc hẹn bị trùng newTop < previousElementBottom');
          this.calendar[i]  = this.dndService.resetAppointmentData(appointment,this.currentAppointment) ;
        } else {
          // console.log('new start this.calendar',newHour, this.calendar,this.currentAppointment.name, i)
          appointment.start = newHour
        }
      },
      // () => console.log('dragging complete')
    );
   
  }

  

  allowDrop(ev) {
    ev.preventDefault();
  }


  draging(ev) {
    this.draggingEvent$.next(ev);
  }


  changeEmployee(em, i,dropName) {
    this.calendar[i] = {
      ...this.calendar[i],
      name: dropName
    }
  }
  
  /**
   * Sau khi nhận được tên nhân viên cùng index của order, tiến hành update thông tin theo thông tin của ô được drop vào
   * @param ev
   */
  dragEnd(ev,em, i) {
    this.isDraggingId = null;
    
    this.draggingElementEvent$ = null;
    delete this.calendar[i].opacity;
    delete this.calendar[i].background;
    
    let currentEmployeeElement =  document.elementFromPoint(ev.pageX,100);
    let dropName = currentEmployeeElement.getAttribute('name');
    // console.log("drag end em",em,dropName);


    if (em != dropName) this.changeEmployee(em, i,dropName);

    this.draggingElement$.complete();
    this.draggingEvent$.complete();
    if (this.smoothMove$) this.smoothMove$.unsubscribe();
    
    this.renderer2.removeClass(currentEmployeeElement,'hover-column');
    this.renderer2.removeClass(ev.target,'active-dragging-element');

    this.cd.reattach()
  }



  onResizeStart(event,name, index, element) {
    console.log('element',element)
    let employeeData = this.calendar[index],
      newStart = employeeData.start,
      newEnd = employeeData.start + employeeData.long;
    
    this.currentAppointment['long'] = employeeData.long;
    this.resizing$ = new BehaviorSubject(event);
    this.resizing$.pipe(
      map((event: ResizeEvent) => {
         // let elementPosWithWindowY = element.getBoundingClientRect().top + window.scrollY; // get current element compare to window
      // let elementPosWithWindowX = element.getBoundingClientRect().left + window.scrollX;
      let elementBottom = +element.getAttribute('bottom');
      let overLapResult = this.resizeService.checkOverLapNextElement(this.calendar,employeeData,elementBottom,name);
      console.log("overLapResult",overLapResult)
      let eventResult = this.resizeService.caculateReizeRatio(event.edges, this.tableDataService.miniBlockHeight);
      let editPosition = event.edges.top ? 'top': 'bottom';
      return {
        resizeResult: this.resizeService.reCaculateStartEndTime(newStart, newEnd, eventResult,editPosition,this.tableDataService.hourPerMiniBlock),
        isOverlapNextElement: overLapResult
      }
      }),
      map(({resizeResult, isOverlapNextElement}) => {
        this.resizeResult = {...resizeResult,key: index};
        let newLong = this.resizeResult.newEnd - newStart;

        employeeData.long = newLong;
        employeeData.height = newLong * this.tableDataService.blockHeight / this.tableDataService.hourPerBlock;
  
        let ghostElement = document.getElementsByClassName('resize-ghost-element')[0];
        // console.log('ghostElement',ghostElement);
        if (ghostElement) {
          
          let timeString = this.resizeService.convertTimeToString(this.resizeResult.newStart,this.resizeResult.newEnd);
          // let nodeValue = document.createTextNode(`start: <strong>${timeString.start}</strong> </br> end: <strong>${timeString.end}</strong> </br> (${timeString.total} mins)`);
          // ghostElement.replaceChild(nodeValue,ghostElement.childNodes[0]);
          ghostElement.innerHTML = `Start: <strong>${timeString.start}</strong> </br> End: <strong>${timeString.end}</strong> </br> (${timeString.total} mins)`;
        }
        return {resizeResult, isOverlapNextElement}
      }),
      last()
    ).subscribe(({resizeResult, isOverlapNextElement}) => {
      // console.log('last result, is overlapping?',resizeResult, isOverlapNextElement);
      if (isOverlapNextElement) {
        alert('Resize bị trùng với cuộc hẹn tiếp theo');
        // console.log('overlaping...')
        employeeData.long = this.currentAppointment.long;
        employeeData.height = this.currentAppointment.long * this.tableDataService.blockHeight / this.tableDataService.hourPerBlock;
      } else {
      }
    })
  }



  onResizing(event) {
    // console.log('event',event)
    if (this.resizing$) this.resizing$.next(event) 
  }

  // TODO: dang su dung thu vien https://github.com/mattlewis92/angular-resizable-element
  // neu muon style thi co the doc them o day xem co customize duoc gi ko
  // CUSTOMIZE https://mattlewis92.github.io/angular-resizable-element/docs/directives/ResizableDirective.html
  onResizeEnd(event: ResizeEvent, em, orderId): void {
    this.resizeResult = null;
    this.resizing$.complete();
   
  }

  isMacintosh() {
    return navigator.platform.indexOf('Mac') > -1
  }
  
  isWindows() {
    return navigator.platform.indexOf('Win') > -1
  }
   


  getScrollBarWidth() {
    let element:HTMLElement = document.querySelector('.group-data');
    this.scrollBarWidth = element.offsetWidth - element.clientWidth;
    console.log("scrollBarWidth",this.scrollBarWidth);
  }

  widthUpdateOnResize(calendar = this.tableDataService.calendar) {
    let element = <HTMLElement>document.querySelector(`.book-table-th`);
    console.log("eleemnt",element.offsetWidth, element);
    let caculatedWidth = Math.round((element.offsetWidth - 50 - this.scrollBarWidth)/10);
    console.log("caculatedWidth",caculatedWidth)
    this.appointmentStyle['width'] = caculatedWidth;
    // console.log('appointmentStyle width', this.appointmentStyle.width)
    this.calendar = this.tableDataService.caculateCalendar(calendar,this.appointmentStyle.width, this.resizeService.filterAndOrderAppointment);
  }

  ngOnInit() {
    
  }

  initingTable() {
    this.currentTime$.pipe(
      take(1),
      ).subscribe(() => {
        this.getScrollBarWidth();
        this.widthUpdateOnResize();
        let scrollToElement = document.getElementsByClassName('scroll-to')[0];
        if (scrollToElement) scrollToElement.scrollIntoView();
        this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.isLoading = true;
    this.initingTable();
  }

}
