import { isElement as _isElement } from 'lodash-es';

export const isValidArray = (obj) => !!obj && typeof obj === 'object' && Array.isArray(obj);

export const objectToMap = (obj) => {
  if (typeof obj !== 'object') { return new Map(); }
  return new Map(Object.entries(obj));
};
