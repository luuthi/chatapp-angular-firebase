import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './smart/management/management.component';
import { ManagementCustomerAddComponent } from './dumb/management-customer-add/management-customer-add.component';
import { ManagementListServiceComponent } from './dumb/management-list-service/management-list-service.component';
import { ManagementObjDetailComponent } from './dumb/management-obj-detail/management-obj-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ManagementRoutingModule
  ],
  declarations: [
    ManagementComponent,
    ManagementCustomerAddComponent,
    ManagementListServiceComponent,
    ManagementObjDetailComponent
  ]
})
export class ManagementModule { }
