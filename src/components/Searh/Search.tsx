import React, { FC, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { SearchProps } from './types';

const Search: FC<SearchProps> = ({ items, value, setValue }) => {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Autocomplete
      id='grouped-products'
      value={value}
      onChange={(_, newSearchValue) => setValue(newSearchValue)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={items}
      groupBy={(option) => option[0].toUpperCase()}
      getOptionLabel={(option) => option}
      sx={{ width: '80%' }}
      renderInput={(params) => (
        <TextField {...params} size='small' label='Поиск продукта' />
      )}
    />
  );
};

export default Search;
