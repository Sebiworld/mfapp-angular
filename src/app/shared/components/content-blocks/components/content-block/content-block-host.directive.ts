import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appContentBlockHost]' })
export class ContentBlockHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
