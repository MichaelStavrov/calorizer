import { Products } from '../../../../../data/products';

export const getNumOfRowsPerPage = (rows: Products[]): number[] => {
  const pageNumbers = [];
  for (let i = 1; i < rows.length; i++) {
    if (i % 2 === 0) {
      pageNumbers.push(i);
    }
  }
  return pageNumbers;
};
