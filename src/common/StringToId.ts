export const stringToId = (str: string): string => {
  return str.toLowerCase().replace(/\s/g, "-");
};
