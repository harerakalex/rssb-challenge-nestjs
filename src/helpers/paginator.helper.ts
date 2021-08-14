export const paginator = (totolItems: number, page: number, limit: number) => {
  let offset: number;
  let pages: number;

  if (!page || Number.isNaN(page)) {
    page = 1;
  }

  if (!limit || Number.isNaN(limit)) {
    limit = 10;
  }

  if (!totolItems) {
    offset = 0;
    return { offset, limit };
  }

  pages = Math.ceil(totolItems / limit);

  const currentPage = getValidPageNumber(page, pages);

  offset = (currentPage - 1) * limit;

  return { offset, limit };
};

const getValidPageNumber = (page: number, totalPages: number) => {
  let thePage = page || 1;
  thePage = thePage > totalPages ? totalPages : thePage <= 0 ? 1 : thePage;
  return thePage;
};
