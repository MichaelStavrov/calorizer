import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  List,
  ListItem,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material';

import ProductStore from '../../../../store/ProductStore';
import UserStore from '../../../../store/UserStore';
import Search from '../../../../components/Searh';
import { ProductCategories, ProductItem } from '../../../../data/products';
import { SingleMealProps } from './types';

const SingleMeal: FC<SingleMealProps> = observer((props) => {
  const { mealNumber } = props;
  const { sortedProducts } = ProductStore;
  const { addToMenuForOneDay, resetMenuForOneDay } = UserStore;

  useEffect(() => {
    return () => {
      resetMenuForOneDay();
    };
  }, []);

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

  const [gramsNumber, setGramsNumber] = useState<{
    [key: string]: string;
  }>({
    [ProductCategories.carbohydrates]: '',
    [ProductCategories.proteins]: '',
    [ProductCategories.fats]: '',
  });

  const getGrams = (kcal: number, grams: number): number => {
    return (kcal * grams) / 100;
  };

  useEffect(() => {
    if (
      Boolean(+gramsNumber[ProductCategories.carbohydrates]) ||
      Boolean(+gramsNumber[ProductCategories.proteins]) ||
      Boolean(+gramsNumber[ProductCategories.fats])
    ) {
      addToMenuForOneDay(
        {
          id: mealNumber + 1,
          carb: {
            ...selectedProduct[ProductCategories.carbohydrates],
            grams: +gramsNumber[ProductCategories.carbohydrates],
            currentKcal:
              getGrams(
                Number(selectedProduct[ProductCategories.carbohydrates]?.kcal),
                +gramsNumber[ProductCategories.carbohydrates]
              ) || 0,
          },
          proteins: {
            ...selectedProduct[ProductCategories.proteins],
            grams: +gramsNumber[ProductCategories.proteins],
            currentKcal:
              getGrams(
                Number(selectedProduct[ProductCategories.proteins]?.kcal),
                +gramsNumber[ProductCategories.proteins]
              ) || 0,
          },
          fats: {
            ...selectedProduct[ProductCategories.fats],
            grams: +gramsNumber[ProductCategories.fats],
            currentKcal:
              getGrams(
                Number(selectedProduct[ProductCategories.fats]?.kcal),
                +gramsNumber[ProductCategories.fats]
              ) || 0,
          },
        },
        mealNumber
      );
    }
  }, [selectedProduct, mealNumber, addToMenuForOneDay, gramsNumber]);

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
  }, [sortedProducts, searchValues, setSelectedProduct]);

  const onChangeValues = (
    value: string,
    productCategory: ProductCategories
  ) => {
    setSearchValues((prev) => ({
      ...prev,
      [productCategory]: value,
    }));
  };

  const onChangeGramsNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    productCategory: ProductCategories
  ) => {
    setGramsNumber((prev) => ({
      ...prev,
      [productCategory]: e.target.value,
    }));
  };

  return (
    <List sx={{ display: 'flex', width: '100%' }}>
      {sortedProducts.map(({ items, productCategory }) => (
        <ListItem
          key={productCategory}
          sx={{
            pl: 0,
            pr: 0,
            justifyContent: 'center',
            gap: '8px',
            flexDirection: 'column',
          }}
        >
          <Search
            items={items.map(({ name }) => name)}
            value={searchValues[productCategory]}
            setValue={(value) => onChangeValues(value, productCategory)}
            label='Выберите продукт'
            sx={{ width: 320 }}
          />
          <Box
            sx={{
              display: 'flex',
              width: '320px',
              gap: '16px',
            }}
          >
            <FormControl
              variant='outlined'
              size='small'
              sx={{ width: '80px', alignSelf: 'flex-end' }}
            >
              <OutlinedInput
                type='number'
                id='standard-adornment-weight'
                sx={{
                  padding: '0 0 0 5px',
                  '& .MuiInput-input': { padding: '0' },
                }}
                value={gramsNumber[productCategory]}
                onChange={(e) => onChangeGramsNumber(e, productCategory)}
                endAdornment={
                  <InputAdornment position='start'>г</InputAdornment>
                }
                inputProps={{
                  'aria-label': 'gram',
                }}
              />
            </FormControl>
            <Paper
              variant='outlined'
              sx={{
                height: '43px',
                width: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {gramsNumber[productCategory] &&
                selectedProduct[productCategory]?.kcal && (
                  <Typography>
                    {(Number(selectedProduct[productCategory]?.kcal) *
                      +gramsNumber[productCategory]) /
                      100}
                  </Typography>
                )}
              <Typography
                sx={{
                  fontSize: '10px',
                  position: 'absolute',
                  bottom: -2,
                  left: 28,
                }}
              >
                ккал
              </Typography>
            </Paper>
          </Box>
        </ListItem>
      ))}
    </List>
  );
});

export default SingleMeal;
