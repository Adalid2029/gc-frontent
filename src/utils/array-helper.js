export const deepCloneArray = (arrayToClone) => {
  return JSON.parse(JSON.stringify(arrayToClone));
};
// a little function to help us with reordering the result
export const simpleReorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
