import { ProductItem, Products } from '../../../../../data/products';
import { deepCopy } from '../../../../../utils/deepCopy';
import { SortOrder } from '../types';

export const sortData = (
  innerSortBy: keyof ProductItem,
  innerSortOrder: SortOrder,
  rows: Products[]
) => {
  const compareFn = (i: ProductItem, j: ProductItem) => {
    if (i[innerSortBy] < j[innerSortBy]) {
      return innerSortOrder === SortOrder.asc ? -1 : 1;
    } else {
      if (i[innerSortBy] > j[innerSortBy]) {
        return innerSortOrder === SortOrder.asc ? 1 : -1;
      } else {
        return 0;
      }
    }
  };

  const itemsToSortCopy: Products[] = deepCopy(rows);
  const sortedItems: Products[] = itemsToSortCopy.map((item) => ({
    ...item,
    items: item.items.sort(compareFn),
  }));

  return sortedItems;
};
