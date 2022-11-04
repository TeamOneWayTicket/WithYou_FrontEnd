export const parseExtUtil = (fileName: string): string => {
  const ext = fileName.split('.').pop();
  return ext;
};
