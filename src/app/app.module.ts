import { AppRoutingModule } from './app-routing.module';
import 'flatpickr/dist/flatpickr.css';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatListModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { ChatModule } from './views/chat/chat.module';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot(),
    MatToolbarModule,
    CommonModule,
    MatGridListModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChatModule,
    OverlayModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
