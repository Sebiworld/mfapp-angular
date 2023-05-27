import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeSrc'
})
export class SafeSrcPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'string') { return; }
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
