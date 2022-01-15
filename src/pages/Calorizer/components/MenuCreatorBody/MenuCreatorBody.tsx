import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Box, List, ListItem } from '@mui/material';

import UserStore from '../../../../store/UserStore';
import SingleMeal from '../SingleMeal';

const MenuCreatorBody: FC = observer(() => {
  const { mealsNumber } = UserStore;

  const columnTitles = ['Углеводы', 'Белки', 'Жиры'];
  const menuOneDay = Array.from({ length: mealsNumber }).fill(null);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <List sx={{ pt: 0, pb: 0, pl: 2, pr: 2 }}>
          <ListItem sx={{ pl: 0, pr: 0 }}>
            <List
              sx={{
                display: 'flex',
                width: '100%',
              }}
            >
              {columnTitles.map((label) => (
                <ListItem
                  key={label}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  {label}
                </ListItem>
              ))}
            </List>
          </ListItem>
          {menuOneDay.map((_, i) => (
            <ListItem key={Math.random()} sx={{ pl: 0, pr: 0 }}>
              <Box component='span'>{i + 1}</Box>
              <SingleMeal mealNumber={i} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
});

export default MenuCreatorBody;
