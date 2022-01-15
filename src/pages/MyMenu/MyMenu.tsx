import React, { FC } from 'react';
import { observer } from 'mobx-react';

import UserStore from '../../store/UserStore';
import { List, ListItem, Paper, Box } from '@mui/material';

const MyMenu: FC = observer(() => {
  const { fullMenu } = UserStore;

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {fullMenu.map(({ id, meal, totalKcal }) => (
        <ListItem key={id} sx={{ padding: 0 }}>
          <Paper variant='outlined' sx={{ pl: 2, pr: 2, width: '100%' }}>
            <Box sx={{ pl: 2, mt: 2, fontSize: 26, fontWeight: 700 }}>
              Ккал: {totalKcal}
            </Box>
            <List>
              {meal &&
                Object.values(meal)
                  .filter(({ carb, proteins, fats }) =>
                    [
                      carb.currentKcal,
                      proteins.currentKcal,
                      fats.currentKcal,
                    ].some(Boolean)
                  )
                  .map((item, i) => (
                    <ListItem
                      key={item.id + Math.random()}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      {i + 1}
                      <List
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          gap: '32px',
                        }}
                      >
                        {Object.values(item)
                          .filter((innerItem) => innerItem !== item.id)
                          .map(({ name, currentKcal, grams }) => (
                            <ListItem
                              key={`${item.id} + ${Math.random()}`}
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '8px',
                                alignItems: 'center',
                              }}
                            >
                              {Boolean(name) && (
                                <Box component='span'>{name}</Box>
                              )}
                              {Boolean(grams) && (
                                <Box component='span'>{grams}г</Box>
                              )}
                              {Boolean(currentKcal) && (
                                <Box component='span'>{currentKcal}ккал</Box>
                              )}
                            </ListItem>
                          ))}
                      </List>
                    </ListItem>
                  ))}
            </List>
          </Paper>
        </ListItem>
      ))}
    </List>
  );
});

export default MyMenu;
