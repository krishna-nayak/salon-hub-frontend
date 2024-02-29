export const capitalizeAllWords = (str) => {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
};
