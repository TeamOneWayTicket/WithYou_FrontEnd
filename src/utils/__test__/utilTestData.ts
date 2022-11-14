export const parsePriceData = [
  {
    input: 1360,
    output: '1,400',
  },
  {
    input: 200000,
    output: '200,000',
  },
  {
    input: 225123,
    output: '225,100',
  },
  {
    input: 242523,
    output: '242,500',
  },
  {
    input: 1000000,
    output: '1,000,000',
  },
  {
    input: 1000400,
    output: '1,000,400',
  },
];

export const parseDistanceData = [
  {
    input: 1000,
    output: '1천',
  },
  {
    input: 10000,
    output: '1만',
  },
  {
    input: 100000,
    output: '10만',
  },
  {
    input: 1000000,
    output: '100만',
  },
  {
    input: 4300,
    output: '4천',
  },
  {
    input: 45000,
    output: '4만5천',
  },
  {
    input: 47900,
    output: '4만8천',
  },
];

export const parseDateData = [
  {
    input: '2022-11-15T14:09:57.979',
    output: '2022.11.15',
  },
  {
    input: '2022-11-01T14:09:57.979',
    output: '2022.11.1',
  },
  {
    input: '2022-02-28T14:09:57.979',
    output: '2022.2.28',
  },
];
