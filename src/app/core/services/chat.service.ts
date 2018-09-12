import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    domReady$: EventEmitter<boolean> = new EventEmitter();

    status = {
        confirm: {
          name: 'confirm',
          value: false
        },
        pending: {
          name: 'pending',
          value: false
        },
        notification: {
          name: 'notification',
          value: false
        },
        statistic: {
          name: 'statistic',
          value: false
        },
        chat: {
          name: 'chat',
          value: false
        }
      }

      toggleItem(item,value?) {
        Object.keys(this.status).map(key => {
          if (item.name == key) {
            this.status[key].value = value? value : !this.status[key].value;
          } else {
            this.status[key].value = false;
          }
        })
      }

}