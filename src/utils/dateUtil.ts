export const parseDate = ({ date, divider = '.' }: { date: string; divider?: string }): string => {
  return date.slice(0, 10).split('-').join(divider);
};

export const parseDateHHMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};
