import React, { FC } from 'react';

import classes from './Header.module.scss';
import ProductTable from './components/ProductTable';

const Products: FC = () => {
  return (
    <div>
      <ProductTable />
    </div>
  );
};

export default Products;
