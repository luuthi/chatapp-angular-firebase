import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardTimetableComponent } from './smart/dashboard-timetable/dashboard-timetable.component';
import { DashboardToolbarPendingComponent } from './dumb/dashboard-toolbar-pending/dashboard-toolbar-pending.component';
import { DashboardToolbarNotificationComponent } from './dumb/dashboard-toolbar-notification/dashboard-toolbar-notification.component';
import { DashboardToolbarConfirmComponent } from './dumb/dashboard-toolbar-confirm/dashboard-toolbar-confirm.component';
import { DashboardToolbarComponent } from './smart/dashboard-toolbar/dashboard-toolbar.component';
import { DashboardComponent } from './smart/dashboard/dashboard.component';
import { CdkTableModule } from '@angular/cdk/table';
import { ResizableModule } from 'angular-resizable-element';
import { MatCardModule, MatListModule, MatInputModule, MatTooltipModule, MatDatepickerModule,MatButtonModule, MatDialog, MatDialogModule, MatTabsModule, MatSelectModule, MatDatepicker, MatRadioButton, MatRadioModule } from '@angular/material';
import { CalendarModule } from 'angular-calendar';
import { DashboardToolbarStatisticComponent } from './dumb/dashboard-toolbar-statistic/dashboard-toolbar-statistic.component';
import { DashboarToolbarDatePickerComponent } from './dumb/dashboar-toolbar-date-picker/dashboar-toolbar-date-picker.component';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { DashboardStateModule } from './dashboard-state/dashboard-state.module';
import { AddAppointmentDialogsComponent } from './smart/add-appointment-dialogs/add-appointment-dialogs.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CdkTableModule,
    ResizableModule,
    MatCardModule,
    MatListModule,
    CalendarModule.forRoot(),
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatButtonModule,
    DashboardStateModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  declarations: [ 
    DashboardTimetableComponent,
    DashboardToolbarConfirmComponent,
    DashboardToolbarPendingComponent,
    DashboardToolbarNotificationComponent,
    DashboardToolbarComponent,
    DashboardComponent,
    DashboardToolbarStatisticComponent,
    DashboarToolbarDatePickerComponent,
    ScrollToDirective,
    AddAppointmentDialogsComponent,
  ],
  entryComponents:[
    AddAppointmentDialogsComponent,
    MatDatepicker
  ]
})
export class DashboardModule { }
