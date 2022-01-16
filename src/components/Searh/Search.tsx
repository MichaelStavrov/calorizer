import React, { FC } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { SearchProps } from './types';

const Search: FC<SearchProps> = (props) => {
  const { items, value, setValue, label, sx } = props;
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Autocomplete
      value={value}
      onChange={(_, newSearchValue) => setValue(newSearchValue)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={items}
      groupBy={(option) => option[0].toUpperCase()}
      getOptionLabel={(option) => option}
      sx={sx || { width: '80%' }}
      renderInput={(params) => (
        <TextField {...params} size='small' label={label || ''} />
      )}
    />
  );
};

export default Search;
