const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string'; //check, isnumber is string
  if (!isString) return defaultValue; //If number isn`t string, function immediately return 'defaultValuey'

  const parsedNumber = parseInt(number, 10); //parseInt('123abc') return 123
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }
  return parsedNumber;
};
// parseNumber('42', 0) return 42, since the string '42' successfully parses into a number.
// parseNumber('abc', 0) return 0, since the string 'abc' cannot parse it into a number, and the result will be NaN.
// parseNumber(123, 0) return 0, since the input value is not a string.
// parseNumber('123abc', 0) return 123, since 'parseInt' parses the beginning of the string until the first incorrect character.

export const parsePaginationParams = (query) => {
  let page = parseNumber(query.page, 1);
  let perPage = parseNumber(query.perPage, 10);
  return { page, perPage };
};
