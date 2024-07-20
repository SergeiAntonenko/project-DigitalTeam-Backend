import { SORT_ORDER } from '../index.js';

const parseSortOrder = (sortOrder) => {
  const isKnowOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnowOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  //function check, does the sortBy parameter (the field by which sorting will be performed) correspond to the keys of contacts that can be sorted (such as _id, name, phoneNumber, etc.)?
  const keyOfContacts = [
    '_id',
    'name',
    'phoneNumber',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
  ];
  if (keyOfContacts.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query; //unpacking an object 'query'

  const parsedSortOrder = parseSortOrder(sortOrder); //parseSortOrder: Перевіряє, чи передане значення sortOrder є відомим напрямом сортування (в порядку зростання або спадання).
  const parsedSortBy = parseSortBy(sortBy); //parseSortBy: Checks if the provided sortBy value is a valid field for sorting (e.g., _id, name, phoneNumber, etc.).
  return {
    sortOrder: parsedSortOrder, //Returns an object containing processed values of sorting parameters.
    sortBy: parsedSortBy,
  };
};
