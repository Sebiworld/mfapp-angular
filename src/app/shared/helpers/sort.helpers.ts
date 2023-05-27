import { isValidArray } from "./general.helpers";

const compareAny = (a: any, b: any): number => {
  if (typeof a === 'number') {
    if (typeof b === 'number' || !b) {
      return compareNumbers(a, b);
    }
  } else if (typeof b === 'number') {
    if (typeof a === 'number' || !a) {
      return compareNumbers(a, b);
    }
  }

  return compareStrings(
    isValidArray(a) ? a.join() : a,
    isValidArray(b) ? b.join() : b
  );
};

const compareStrings = (a, b): number => ('' + a).toLowerCase().localeCompare(('' + b).toLowerCase());

export const compareNumberStrings = (a, b): number => {
  const aNum = typeof a !== 'number' ? parseInt(a, 10) : a;
  const bNum = typeof b !== 'number' ? parseInt(b, 10) : b;

  if (typeof aNum === 'number' && !isNaN(aNum) && typeof bNum === 'number' && !isNaN(bNum)) {
    return aNum - bNum;
  }

  return ('' + a).toLowerCase().localeCompare(('' + b).toLowerCase());
};

const compareNumbers = (a, b): number => {
  if (typeof a !== 'number' && typeof b !== 'number') { return 0; }
  if (typeof b !== 'number') { return 1; }
  if (typeof a !== 'number') { return -1; }
  return a - b;
};

export const SortHelpers = { compareAny, compareStrings, compareNumberStrings, compareNumbers };
