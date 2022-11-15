export const parseDate = ({ date, divider = '.' }: { date: string; divider?: string }): string => {
  return date.slice(0, 10).split('-').join(divider);
};
