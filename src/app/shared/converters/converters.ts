import { toLower as _toLower } from 'lodash';
import { parse as dateParse, format as dateFormat, getTime } from 'date-fns';

const parseStringData = (data) => '' + data;

const parseBooleanData = (data) => !!data && data !== '0' && data !== 'false' && data !== 0;

const parseDateData = (data, format: string = 'dd.MM.yyyy', isUTC = false) => {
  if (data === undefined || data === null || data === '' || data === 'Invalid date') {
    return undefined;
  }

  if(typeof data === 'number' && format === 'server'){
    return data * 1000;
  }

  const parsedDate = dateParse(data, format, new Date());
  let result: number;
  if (isUTC) {
    result = Date.UTC(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate(),
      parsedDate.getHours(),
      parsedDate.getMinutes(),
      parsedDate.getSeconds(),
      parsedDate.getMilliseconds()
    );
  } else {
    result = getTime(parsedDate.valueOf());
  }

  if (typeof result !== 'number' || isNaN(result)) { return undefined; }
  return result;
};

const parseDateDataBack = (data, format: string = 'dd.MM.yyyy') => {
  if (data === undefined || data === null || isNaN(data) || data === 'Invalid date') {
    return undefined;
  }
  return dateFormat(data, format);
};

const stripHtmlTags = (data: string) => data.replace(/(<([^>]+)>)/ig, '');

const parseIntOr = (value: any, fallback: number): number => {
  if (typeof value === 'number') { return value; }
  if (typeof value !== 'string') { return fallback; }
  const output = parseInt(value, 10);
  if (!isNaN(output)) { return output; }
  return fallback;
};

const parseFloatOr = (value: any, fallback: number): number => {
  if (typeof value === 'number') { return value; }
  if (typeof value !== 'string') { return fallback; }
  const output = parseFloat(value);
  if (!isNaN(output)) { return output; }
  return fallback;
};

export const Converters = {
  parseStringData,
  parseBooleanData,
  parseDateData,
  parseDateDataBack,
  stripHtmlTags,
  parseIntOr,
  parseFloatOr
};
