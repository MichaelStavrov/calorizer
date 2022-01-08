import { ProductItem, Products } from '../../../../data/products';

export interface THead {
  id: number;
  name: keyof ProductItem;
  label: string;
}

export interface TableHeadComponentProps {
  setRows: React.Dispatch<React.SetStateAction<Products[]>>;
}
