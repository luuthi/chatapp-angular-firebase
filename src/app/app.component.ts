import { ChatService } from './core/services/chat.service';
import { Component, ChangeDetectionStrategy, HostListener, ContentChildren, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('flipInFade', [
      state('false' , style({transform: 'rotateY(0deg)', transformStyle: 'preserve-3d'})),
      state('true', style({transform: 'rotateY(180deg)', transformStyle: 'preserve-3d'})),
      transition('* => *', animate('0.3s ease-in-out')),
    ]),
  ],
})
export class AppComponent {
  confirm;
  pending;
  statistic;
  notification;
  chatBtn;
  chatSection;
  
  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.selectElement();
    
    // console.log('all element?',
    // this.confirm,
    // this.pending,
    // this.statistic,
    // this.notification,
    // this.chatBtn,
    // this.chatSection);
    
    // console.log('event.path confirm',event.path.includes(this.confirm),this.confirm, event.path)
    if (event.path.includes(this.confirm)) this.chatService.toggleItem(this.chatService.status.confirm,true)
    else if (event.path.includes(this.pending)) this.chatService.toggleItem(this.chatService.status.pending,true)
    else if (event.path.includes(this.statistic)) this.chatService.toggleItem(this.chatService.status.statistic,true)
    else if (event.path.includes(this.notification)) this.chatService.toggleItem(this.chatService.status.notification,true)
    else if (event.path.includes(this.chatSection)) this.chatService.toggleItem(this.chatService.status.chat,true)
    else if (event.path.includes(this.chatBtn)) this.chatService.toggleItem(this.chatService.status.chat)
    else {
      this.chatService.toggleItem({name:''});
    }
  }

  constructor(
    public chatService: ChatService,
  ) {
  }

  selectElement() {
    this.confirm = document.getElementsByClassName('navbar-confirm')[0];
    this.pending = document.getElementsByClassName('navbar-pending')[0];
    this.statistic = document.getElementsByClassName('navbar-statistic')[0];
    this.notification = document.getElementsByClassName('navbar-notifications')[0];
    this.chatBtn = document.getElementsByClassName('btn-messages')[0];
    this.chatSection = document.getElementsByClassName('app-chat')[0];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chatService.domReady$.pipe(
      take(1)
    ).subscribe(() => {
      
      this.selectElement();
      // console.log('all element?',
      // this.confirm,
      // this.pending,
      // this.statistic,
      // this.notification,
      // this.chatBtn,
      // this.chatSection);
    })


  }


}