export const deepCopy = (obj: object) => {
  return JSON.parse(JSON.stringify(obj));
};
