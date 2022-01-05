import React, { FC, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
} from '@mui/material';

import { products } from '../../../../data/products';

const ProductTable = () => {
  const [sortBy, setSortBy] = useState('kcal');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const deepCopy = (a: any) => {
    return JSON.parse(JSON.stringify(a));
  };

  const sortData = (innerSortBy: any, innerSortOrder: any, rows: any) => {
    let itemsToSort = deepCopy(rows);
    let sortedItems = [];

    const compareFn = (i: any, j: any) => {
      if (i[innerSortBy] < j[innerSortBy]) {
        return innerSortOrder === 'asc' ? -1 : 1;
      } else {
        if (i.kcal > j.kcal) {
          return innerSortOrder === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      }
    };

    sortedItems = itemsToSort.map((item: any) => ({
      ...item,
      items: item.items.sort(compareFn),
    }));

    return sortedItems;
  };

  const [rows, setRows] = useState(sortData('kcal', 'asc', products));

  const requestSort = (pSortBy: any) => {
    let innerSortBy = sortBy;
    let innerSortOrder = sortOrder;
    return () => {
      if (pSortBy === sortBy) {
        innerSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        innerSortBy = pSortBy;
        innerSortOrder = 'asc';
      }
      const sortedItems = sortData(innerSortBy, innerSortOrder, products);
      setSortOrder(innerSortOrder);
      setSortBy(innerSortBy);
      setRows(sortedItems);
    };
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, borderCollapse: 'inherit' }}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Продукты</TableCell>
            <TableCell align='center'>
              <TableSortLabel
                active={sortBy === 'kcal'}
                direction={sortOrder}
                onClick={requestSort('kcal')}
              >
                Ккал
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>
              <TableSortLabel
                active={sortBy === 'proteins'}
                direction={sortOrder}
                onClick={requestSort('proteins')}
              >
                Белки (г)
              </TableSortLabel>
            </TableCell>
            <TableCell align='center'>Жиры (г)</TableCell>
            <TableCell align='center'>Углеводы (г)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ category, items }: { category: any; items: any }) => (
            <React.Fragment key={category}>
              <TableRow>
                <TableCell
                  sx={{ borderBottom: 'none', fontWeight: 700, fontSize: 18 }}
                >
                  {category}
                </TableCell>
              </TableRow>
              {items.map(
                ({
                  name,
                  kcal,
                  proteins,
                  fats,
                  carbohydrates,
                }: {
                  name: any;
                  kcal: any;
                  proteins: any;
                  fats: any;
                  carbohydrates: any;
                }) => (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell align='center'>{kcal}</TableCell>
                    <TableCell align='center'>{proteins}</TableCell>
                    <TableCell align='center'>{fats}</TableCell>
                    <TableCell align='center'>{carbohydrates}</TableCell>
                  </TableRow>
                )
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
