import { describe } from '@jest/globals';

import { parseDistance, parsePrice } from '../stringUtil';
import { parseDistanceData, parsePriceData } from './utilTestData';

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
