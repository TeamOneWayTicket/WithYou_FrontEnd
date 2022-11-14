export const parseDate = ({ date, divider = '.' }: { date: string; divider?: string }): string => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${year}${divider}${month}${divider}${day}`;
};
