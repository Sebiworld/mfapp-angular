import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {

  private readonly htmlEntities = {
    nbsp: ' ',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    copy: '©',
    reg: '®',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: '\'',
    times: '×',
    deg: '°',
    sup2: '²',
    sup3: '³',
    Agrave: 'À',
    Aacute: 'Á',
    Acirc: 'Â',
    Atilde: 'Ã',
    Auml: 'Ä',
    Aring: 'Å',
    agrave: 'à',
    aacute: 'á',
    acirc: 'â',
    atilde: 'ã',
    auml: 'ä',
    aring: 'å',
    AElig: 'Æ',
    aelig: 'æ',
    szlig: 'ß',
    Ccedil: 'Ç',
    ccedil: 'ç',
    Egrave: 'È',
    Eacute: 'É',
    Ecirc: 'Ê',
    Euml: 'Ë',
    egrave: 'è',
    eacute: 'é',
    ecirc: 'ê',
    euml: 'ë',
    Igrave: 'Ì',
    Icirc: 'Î',
    Iuml: 'Ï',
    igrave: 'í',
    icirc: 'î',
    iuml: 'ï',
    Ntilde: 'Ñ',
    ntilde: 'ñ',
    Ograve: 'Ò',
    Oacute: 'Ó',
    Ocirc: 'Ô',
    Otilde: 'Õ',
    Ouml: 'Ö',
    ograve: 'ò',
    oacute: 'ó',
    ocirc: 'ô',
    otilde: 'õ',
    ouml: 'ö',
    Oslash: 'Ø',
    oslash: 'ø',
    Ugrave: 'Ù',
    Uacute: 'Ú',
    Ucirc: 'Û',
    Uuml: 'Ü',
    ugrave: 'ù',
    uacute: 'ú',
    ucirc: 'û',
    uuml: 'ü',
    Yacute: 'Ý',
    yacute: 'ý',
    yuml: 'ÿ'
  };

  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'string') { return; }
    return value.replace(/<br\s*[\/]?>/gi, ' ').replace(/(<([^>]+)>)/ig, '').replace(/\&([^;]+);/g, (entity, entityCode) => {
      let match;

      if (entityCode in this.htmlEntities) {
        return this.htmlEntities[entityCode];
        /*eslint no-cond-assign: 0*/
      } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
        return String.fromCharCode(parseInt(match[1], 16));
        /*eslint no-cond-assign: 0*/
      } else if (match = entityCode.match(/^#(\d+)$/)) {
        return String.fromCharCode(match[1]);
      } else {
        return entity;
      }
    }); // replace tags
  }

}
