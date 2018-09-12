import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {
  @Input('appScrollTo') isOpenTime: boolean;
  constructor(private elRef:ElementRef) {}
  ngAfterViewInit() {
    if (this.isOpenTime) {
      console.log('scroll to you',this.elRef.nativeElement)
      this.elRef.nativeElement.scrollIntoView();
    }
  }

}
