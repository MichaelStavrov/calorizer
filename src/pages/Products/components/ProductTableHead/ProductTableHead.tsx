import React, { FC, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

import { ProductItem } from '../../../../data/products';
import { SortOrder } from '../ProductTable/types';
import { sortData } from '../ProductTable/utils/sortData';
import ProductStore from '../../../../store/ProductStore';
import { TableHeadComponentProps, THead } from './types';

const ProductTableHead: FC<TableHeadComponentProps> = observer(
  ({ setRows }) => {
    const { products } = ProductStore;
    const [sortBy, setSortBy] = useState<keyof ProductItem>('kcal');
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.asc);

    const tHead: THead[] = useMemo(
      () => [
        { id: 1, name: 'name', label: 'Продукты' },
        { id: 2, name: 'kcal', label: 'Ккал' },
        { id: 3, name: 'proteins', label: 'Белки (г)' },
        { id: 4, name: 'fats', label: 'Жиры (г)' },
        { id: 5, name: 'carbohydrates', label: 'Углеводы (г)' },
      ],
      []
    );

    // сортировка по столбцам
    const requestSort = (pSortBy: keyof ProductItem) => {
      let innerSortBy = sortBy;
      let innerSortOrder = sortOrder;
      return () => {
        if (pSortBy === sortBy) {
          innerSortOrder =
            sortOrder === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
        } else {
          innerSortBy = pSortBy;
          innerSortOrder = SortOrder.asc;
        }
        const sortedItems = sortData(innerSortBy, innerSortOrder, products);
        setSortOrder(innerSortOrder);
        setSortBy(innerSortBy);
        setRows(sortedItems);
      };
    };

    return (
      <TableHead>
        <TableRow>
          {tHead.map(({ id, label, name }) => (
            <TableCell align='center' key={id}>
              {name === 'name' ? (
                label
              ) : (
                <TableSortLabel
                  sx={{ textAlign: 'center', marginRight: '-18px' }}
                  active={sortBy === name}
                  direction={sortOrder}
                  onClick={requestSort(name)}
                >
                  {label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
);

export default ProductTableHead;
