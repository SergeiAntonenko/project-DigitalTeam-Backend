// The function calculatePaginationData returns an object with comprehensive pagination information, including the current page number, number of items per page, total number of items, total number of pages, and indicators for the presence of next and previous pages.
// count: Total number of contacts.
// page: Current page number.
// perPage: Number of items per page.
export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage); //обчислює загальну кількість сторінок,

  //Check presence next page:
  const hasNextPage = page < totalPages;

  //Check presence previous page:
  const hasPreviosPage = page > 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviosPage,
    hasNextPage,
  };
};
