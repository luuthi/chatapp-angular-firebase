import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatNativeDateModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


let Modules = [
  MatToolbarModule,
  MatButtonModule,
  FlexLayoutModule,
  MatNativeDateModule,
  MatListModule,
]

@NgModule({
  imports: [
    CommonModule,
    ...Modules
  ],
  declarations: [],
  providers: [
    // service here
  ],
  exports: [
    ...Modules
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Already import core module');
    }
  }
 }
