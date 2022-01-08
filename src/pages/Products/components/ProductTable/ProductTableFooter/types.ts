import React from 'react';

import { Products } from '../../../../../data/products';

export interface ProductTableFooterProps {
  rows: Products[];
  page: number;
  rowsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}
