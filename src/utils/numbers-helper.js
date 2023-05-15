/**
 * Always returning a double-digit number
 * @param string myNumber
 * @returns {string}
 */
export const doubleDigit = (myNumber) => {
  return `00${myNumber}`.slice(-2);
};
