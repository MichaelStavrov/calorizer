import React, { FC, useMemo, useState } from 'react';

import classes from './Products.module.scss';
import ProductTable from './components/ProductTable';
import Search from '../../components/Searh';
import { products } from '../../data/products';

const Products: FC = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const itemsToSearch = useMemo(
    () => products.flatMap(({ items }) => items.map(({ name }) => name)).sort(),
    []
  );

  return (
    <div className={classes.productsWrapper}>
      <div className={classes.search}>
        <Search
          items={itemsToSearch}
          value={searchValue}
          setValue={setSearchValue}
        />
      </div>
      <div className={classes.productTable}>
        <ProductTable filter={searchValue} />
      </div>
    </div>
  );
};

export default Products;
