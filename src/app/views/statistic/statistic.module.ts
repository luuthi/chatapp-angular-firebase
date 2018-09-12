import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticComponent } from './smart/statistic/statistic.component';

@NgModule({
  imports: [
    CommonModule,
    StatisticRoutingModule
  ],
  declarations: [
    StatisticComponent,
  ]
})
export class StatisticModule { }
