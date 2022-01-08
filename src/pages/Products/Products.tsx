import React, { FC, useMemo, useState } from 'react';
import { observer } from 'mobx-react';

import classes from './Products.module.scss';
import ProductTable from './components/ProductTable';
import Search from '../../components/Searh';
import ProductStore from '../../store/ProductStore';

const Products: FC = observer(() => {
  const { products } = ProductStore;
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const itemsToSearch = useMemo(
    () => products.flatMap(({ items }) => items.map(({ name }) => name)).sort(),
    [products]
  );

  return (
    <div className={classes.productsWrapper}>
      <div className={classes.search}>
        <Search
          items={itemsToSearch}
          value={searchValue}
          setValue={setSearchValue}
          label='Поиск продуктов'
        />
      </div>
      <div className={classes.productTable}>
        <ProductTable filter={searchValue} />
      </div>
    </div>
  );
});

export default Products;
