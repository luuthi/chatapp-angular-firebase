import { AppRoutingModule } from './app-routing.module';
import 'flatpickr/dist/flatpickr.css';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { ChatModule } from './views/chat/chat.module';
import { CoreModule } from './core/core.module';

/** 
   * xin lưu ý:
   * 1) tất cả module cho UI nếu dùng ở khu nào nên import vào module khu đó: 
   * - vd: CalendarModule cho khu vực dashboard thì nên import vào Dashboard Module, import vào App Module cũng ko có tác dụng.
   * - vd: MatButtonModule dùng cho cả app.component.html và cẩ trong khu vực dashboard thì nên import vào cả Dashboard Module và App Module.
   * 2) module import vào app.module mà là module dạng UI (như material) hoặc service không quan trọng thì có thể vứt vào core.module nhìn cho gọn.
   * - vd: MatButtonModule nên vứt vào core module
   * - vd: AuthenticationModule dùng ở nhiều chỗ kèm auth.service nên vứt vào core module.
   * 3) module import vào app.module chỉ nên các module quan trọng hoặc ko thể import vào core module như là: 
   * - module có chữ forRoot()
   * - module của một số khu vực: chat module, dashboardModule (nếu ko lazyload)...
*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot(),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AppRoutingModule,
    ChatModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
