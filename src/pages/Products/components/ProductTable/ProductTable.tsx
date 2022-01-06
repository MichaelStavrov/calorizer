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
  TableFooter,
  TablePagination,
} from '@mui/material';

import { ProductItem, products } from '../../../../data/products';
import { ProductTableProps, SortOrder } from './types';
import { sortData } from './utils/sortData';
import { tHead } from './utils/tHead';
import TablePaginationActions from '../TablePaginationActions';

const ProductTable: FC<ProductTableProps> = ({ filter }) => {
  const [sortBy, setSortBy] = useState<keyof ProductItem>('kcal');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.asc);
  const [rows, setRows] = useState(sortData('kcal', SortOrder.asc, products));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  // фильтрация по наименованиям
  useEffect(() => {
    if (filter) {
      setRows(sortData('kcal', SortOrder.asc, products));
      setRows((prev) =>
        prev.filter(({ items }) => items.find(({ name }) => name === filter))
      );
    } else {
      setRows(sortData('kcal', SortOrder.asc, products));
    }
  }, [filter]);

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

  // пагинация
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableContainer component={Paper} variant='outlined'>
      <Table sx={{ minWidth: 650, borderCollapse: 'inherit' }}>
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
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map(({ category, items }) => (
            <React.Fragment key={category}>
              <TableRow>
                <TableCell
                  sx={{ borderBottom: 'none', fontWeight: 700, fontSize: 18 }}
                >
                  {category}
                </TableCell>
              </TableRow>
              {items.map((item) => (
                <TableRow
                  key={item.name}
                  sx={
                    filter === item.name
                      ? {
                          backgroundColor: 'var(--success-light)',
                          color: 'white',
                        }
                      : {}
                  }
                >
                  {Object.values(item).map((value, i) => (
                    <TableCell
                      align={i === 0 ? 'left' : 'center'}
                      key={`${value}${Math.random()}`}
                      sx={{ color: 'inherit' }}
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[2, 4, { label: 'Все', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'На странице',
                },
                native: true,
              }}
              labelDisplayedRows={({ from, to, count }) => {
                return 'Категории ' + from + '-' + to + ' из ' + count;
              }}
              labelRowsPerPage={<span>Кол-во категорий на странице</span>}
              onPageChange={(_, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
