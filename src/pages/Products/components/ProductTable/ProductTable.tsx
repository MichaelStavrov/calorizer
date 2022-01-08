import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Table, TableContainer, Paper } from '@mui/material';

import ProductStore from '../../../../store/ProductStore';
import { ProductTableProps, SortOrder } from './types';
import { sortData } from './utils/sortData';
import ProductTableHead from '../ProductTableHead';
import ProductTableBody from '../ProductTableBody';
import ProductTableFooter from './ProductTableFooter';

const ProductTable: FC<ProductTableProps> = observer(({ filter }) => {
  const { products } = ProductStore;
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
  }, [filter, products]);

  // // пагинация
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableContainer component={Paper} variant='outlined'>
      <Table
        sx={{
          minWidth: 650,
          borderCollapse: 'inherit',
          '& .MuiTableCell-root': { padding: '8px 12px' },
        }}
      >
        <ProductTableHead setRows={setRows} />
        <ProductTableBody
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          filter={filter}
        />
        <ProductTableFooter
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
});

export default ProductTable;
