import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  OutlinedInput,
  InputAdornment,
  List,
  ListItem,
  Button,
} from '@mui/material';

import { ProductItem, ProductCategories } from '../../../data/products';
import ProductStore from '../../../store/ProductStore';
import { AddProductFormProps } from './types';

const AddProductFrom: FC<AddProductFormProps> = observer(({ closeForm }) => {
  const { addProduct } = ProductStore;
  const [selectedProductCategory, setSelectedProductCategory] =
    useState<ProductCategories | null>(null);

  const [newProduct, setNewProduct] = useState<ProductItem>({
    name: '',
    kcal: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
  });

  const productCategories = [
    { label: 'Углеводы', value: ProductCategories.carbohydrates },
    { label: 'Белки', value: ProductCategories.proteins },
    { label: 'Жиры', value: ProductCategories.fats },
  ];

  const productOptions = [
    { label: 'Ккал', option: 'kcal' },
    { label: 'Б', option: 'proteins' },
    { label: 'Ж', option: 'fats' },
    { label: 'У', option: 'carbohydrates' },
  ];

  return (
    <Box
      sx={{ width: 600, display: 'flex', flexDirection: 'column', gap: '24px' }}
    >
      <Typography component='p' variant='h6'>
        Добавить продукт
      </Typography>
      <FormControl fullWidth>
        <InputLabel id='product-category-selection'>
          Выберите категорию продукта
        </InputLabel>
        <Select
          sx={{ height: '54px' }}
          labelId='product-category-selection'
          id='product-category'
          value={selectedProductCategory}
          label='Выберите категорию продукта'
          onChange={(e) =>
            setSelectedProductCategory(e.target.value as ProductCategories)
          }
        >
          {productCategories.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant='outlined' size='small' sx={{ width: '100%' }}>
        <OutlinedInput
          id='product-name'
          placeholder='Название продукта'
          sx={{ height: '54px' }}
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </FormControl>
      <List sx={{ display: 'flex', gap: '8px' }}>
        {productOptions.map(({ label, option }) => {
          const typedOption = option as keyof ProductItem;
          return (
            <ListItem
              key={label}
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                alignItems: 'center',
              }}
            >
              <Box component='span'>{label}</Box>
              <FormControl variant='outlined' size='small'>
                <OutlinedInput
                  type='number'
                  id='product-name'
                  sx={{ height: '54px' }}
                  value={newProduct[typedOption]}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      [typedOption]: e.target.value,
                    }))
                  }
                  endAdornment={
                    <InputAdornment position='start'>
                      {label === 'Ккал' ? '' : 'г'}
                    </InputAdornment>
                  }
                  inputProps={{
                    'aria-label': label,
                  }}
                />
              </FormControl>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Button
          variant='contained'
          onClick={() => {
            if (selectedProductCategory) {
              addProduct(selectedProductCategory, newProduct);
              closeForm();
            }
          }}
        >
          Сохранить
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            closeForm();
          }}
        >
          Отменить
        </Button>
      </Box>
    </Box>
  );
});

export default AddProductFrom;
