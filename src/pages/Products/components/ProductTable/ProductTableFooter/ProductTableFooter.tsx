import React, { FC } from 'react';
import { TableFooter, TableRow, TablePagination } from '@mui/material';

import { getNumOfRowsPerPage } from '../utils/getNumOfRowsPerPage';
import TablePaginationActions from '../../TablePaginationActions';
import { ProductTableFooterProps } from './types';

const ProductTableFooter: FC<ProductTableFooterProps> = (props) => {
  const { rows, page, rowsPerPage, setPage, setRowsPerPage } = props;

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[
            ...getNumOfRowsPerPage(rows),
            { label: 'Все', value: -1 },
          ]}
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
  );
};

export default ProductTableFooter;
