import { ProductItem } from '../../../../../data/products';

export interface THead {
  id: number;
  name: keyof ProductItem;
  label: string;
}

export const tHead: THead[] = [
  { id: 1, name: 'name', label: 'Продукты' },
  { id: 2, name: 'kcal', label: 'Ккал' },
  { id: 3, name: 'proteins', label: 'Белки (г)' },
  { id: 4, name: 'fats', label: 'Жиры (г)' },
  { id: 5, name: 'carbohydrates', label: 'Углеводы (г)' },
];
