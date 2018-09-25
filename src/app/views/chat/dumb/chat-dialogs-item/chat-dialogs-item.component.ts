import { Component, OnInit, Input } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-chat-dialogs-item',
  templateUrl: './chat-dialogs-item.component.html',
  styleUrls: ['./chat-dialogs-item.component.scss']
})
export class ChatDialogsItemComponent implements OnInit {

  @Input() conversation: any;
  
  constructor() { }

  ngOnInit() {
    this.conversation.lastTime_display = this.renderTime(this.conversation.lastTime);
  }
  renderTime(time){
    let current = new Date();
    let today = new Date(current.setHours(0,0,0,0));
    var day = current.getDay(),
    diff = current.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    let monday =  new Date(cloneDeep(today).setDate(diff));
    if ((time - today.getTime() / 1000) > 0){
      return new Date(time * 1000).toLocaleTimeString()
    } else if((time - (today.getTime() / 1000 - 24 * 60 * 60)) > 0){
      return "Yesterday";
    } else if(time - monday.getTime() > 0){
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var dayOfWeek = days[new Date(time * 1000).getDay()];
      return dayOfWeek;
    } else {
      return new Date(time * 1000).toLocaleDateString()
    }
  }

}
