import { Products } from '../../../../data/products';

export interface ProductTableBodyProps {
  rows: Products[];
  page: number;
  rowsPerPage: number;
  filter: string | null;
}
