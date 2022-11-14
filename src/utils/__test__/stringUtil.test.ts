import { describe } from '@jest/globals';

import { parseDate } from '../dateUtil';
import { parseDistance, parsePrice } from '../stringUtil';
import { parseDateData, parseDistanceData, parsePriceData } from './utilTestData';

describe('test parsed price util', () => {
  test.each(parsePriceData)('test parsed price', (data) => {
    expect(parsePrice(data.input)).toBe(data.output);
  });
});

describe('test parsed distance util', () => {
  test.each(parseDistanceData)('test parsed distance', (data) => {
    expect(parseDistance(data.input)).toBe(data.output);
  });
});

describe('test parsed date util', () => {
  test.each(parseDateData)('test parsed date', (data) => {
    expect(
      parseDate({
        date: data.input,
      })
    ).toBe(data.output);
  });
});
