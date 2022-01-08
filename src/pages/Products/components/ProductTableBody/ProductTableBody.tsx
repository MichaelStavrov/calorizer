import React, { FC } from 'react';
import { TableBody, TableRow, TableCell } from '@mui/material';

import { ProductTableBodyProps } from './types';

const ProductTableBody: FC<ProductTableBodyProps> = (props) => {
  const { page, rows, rowsPerPage, filter } = props;

  return (
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
  );
};

export default ProductTableBody;
