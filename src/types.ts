import { ProductItem } from './data/products';

export interface MenuForOneDayItem {
  name?: string;
  kcal?: number;
  proteins?: number;
  fats?: number;
  carbohydrates?: number;
  currentKcal: number | null;
  grams: number;
}

export interface MealToMenuForOneDay {
  id: number;
  carb: MenuForOneDayItem;
  proteins: MenuForOneDayItem;
  fats: MenuForOneDayItem;
}

export interface MenuForOneDay {
  [key: string]: MealToMenuForOneDay;
}

export interface FullMenu {
  id: number;
  meal: MenuForOneDay | null;
  totalKcal: number;
}

export interface TotalKcal {
  totalCarbs: number;
  totalProteins: number;
  totalFats: number;
}
