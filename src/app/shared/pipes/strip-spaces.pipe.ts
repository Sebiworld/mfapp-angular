import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripSpaces'
})
export class StripSpacesPipe implements PipeTransform {

  protected replacements = {
    ' ': '&nbsp;',
    '-': '&#8209;'
  };

  transform(value: any, replacements: { [key: string]: string } | false = {}, ...args: any[]): any {
    if (typeof value !== 'string') { return; }

    if (replacements === false) { return value; }
    else if (typeof replacements !== 'object') { replacements = {}; }

    const replacementsTmp = { ...this.replacements, ...replacements };
    let output = '' + value;

    for (const key in replacementsTmp) {
      if (typeof replacementsTmp[key] !== 'string') { continue; }
      output = output.replace(new RegExp(key, 'gi'), replacementsTmp[key]);
    }

    return output;
  }

}
