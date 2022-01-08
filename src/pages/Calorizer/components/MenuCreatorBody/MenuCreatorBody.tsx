import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Box, List, ListItem } from '@mui/material';

import UserStore from '../../../../store/UserStore';
import SingleMeal from '../SingleMeal';

const MenuCreatorBody: FC = observer(() => {
  const { mealsNumber } = UserStore;

  const mealsNumberArray = Array.from({ length: mealsNumber }).fill(0);
  const title = ['Углеводы', 'Белки', 'Жиры'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <List sx={{ pt: 0, pb: 0, pl: 2, pr: 2 }}>
        <ListItem sx={{ pl: 0, pr: 0 }}>
          <List
            sx={{
              display: 'flex',
              width: '100%',
            }}
          >
            {title.map((label) => (
              <ListItem
                key={label}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                {label}
              </ListItem>
            ))}
          </List>
        </ListItem>
        {mealsNumberArray.map(() => (
          <ListItem key={Math.random()} sx={{ pl: 0, pr: 0 }}>
            <SingleMeal />
          </ListItem>
        ))}
      </List>
    </Box>
  );
});

export default MenuCreatorBody;
