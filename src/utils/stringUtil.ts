// split 3 char
const priceAnchor = 100;
const distAnchor = 1000;

export const parsePrice = (price: number): string => {
  const flooredPrice = Math.round(price / priceAnchor) * priceAnchor;
  return flooredPrice.toLocaleString('ko-KR');
};

const distText = ['천', '만'];

export const parseDistance = (meter: number): string => {
  const flooredMeter = Math.round(meter / distAnchor) * distAnchor;
  const meterString = flooredMeter.toString();

  if (meterString.length >= 4) {
    const chunStr = parseInt(meterString[meterString.length - 4]);
    let ret = chunStr === 0 ? '' : chunStr.toString() + distText[0];
    let distIdx = 1;
    let start;
    for (let i = meterString.length - 5; i >= 0; i -= 4, distIdx++) {
      if (i - 4 < 0) start = 0;
      else start = i - 3;
      const dist = parseInt(meterString.slice(start, i + 1));
      if (dist === 0) continue;
      ret = dist.toString() + distText[distIdx] + ret;
    }
    return ret;
  }

  return meterString;
};
