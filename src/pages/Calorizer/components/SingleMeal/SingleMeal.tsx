import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { List, ListItem, Paper, Typography } from '@mui/material';

import ProductStore from '../../../../store/ProductStore';
import Search from '../../../../components/Searh';
import { ProductCategories, ProductItem } from '../../../../data/products';

const SingleMeal: FC = observer(() => {
  const { sortedProducts } = ProductStore;
  const [searchValues, setSearchValues] = useState<{
    [key: string]: string | null;
  }>({
    [ProductCategories.carbohydrates]: null,
    [ProductCategories.proteins]: null,
    [ProductCategories.fats]: null,
  });
  const [selectedProduct, setSelectedProduct] = useState<{
    [key: string]: ProductItem | null;
  }>({
    [ProductCategories.carbohydrates]: null,
    [ProductCategories.proteins]: null,
    [ProductCategories.fats]: null,
  });

  const onChangeValues = (
    value: string,
    productCategory: ProductCategories
  ) => {
    setSearchValues((prev) => ({
      ...prev,
      [productCategory]: value,
    }));
  };

  useEffect(() => {
    sortedProducts.forEach(({ items, productCategory }) => {
      const currentItem = items.find((item) =>
        Object.values(searchValues).includes(item.name)
      );
      if (currentItem) {
        setSelectedProduct((prev) => ({
          ...prev,
          [productCategory]: currentItem,
        }));
      } else {
        setSelectedProduct((prev) => ({
          ...prev,
          [productCategory]: null,
        }));
      }
    });
  }, [sortedProducts, searchValues]);

  return (
    <List sx={{ display: 'flex', width: '100%' }}>
      {sortedProducts.map(({ items, productCategory }) => (
        <ListItem
          key={productCategory}
          sx={{ pl: 0, pr: 0, justifyContent: 'center', gap: '8px' }}
        >
          <Search
            items={items.map(({ name }) => name)}
            value={searchValues[productCategory]}
            setValue={(value) => onChangeValues(value, productCategory)}
            label='Выберите продукт'
            sx={{ width: 220 }}
          />
          <Paper
            elevation={2}
            sx={{
              height: '43px',
              width: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>{selectedProduct[productCategory]?.kcal}</Typography>
          </Paper>
        </ListItem>
      ))}
    </List>
  );
});

export default SingleMeal;
