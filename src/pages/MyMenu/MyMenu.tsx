import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import UserStore from '../../store/UserStore';
import { List, ListItem, Paper, Box, Button, Typography } from '@mui/material';
import CustomModal from '../../components/CustomModal';

const MyMenu: FC = observer(() => {
  const { fullMenu, removeMenu } = UserStore;
  const [openRemoveMenuModal, setOpenRemoveMenuModal] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState(0);

  return (
    <>
      <CustomModal
        open={openRemoveMenuModal}
        closeModal={() => setOpenRemoveMenuModal(false)}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: 400,
          }}
        >
          <Typography component='p' variant='h6'>
            Удаление текущего меню
          </Typography>
          <Typography component='p'>Вы действительно этого хотите?</Typography>
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Button
              variant='contained'
              onClick={() => {
                removeMenu(selectedMenuId);
                setOpenRemoveMenuModal(false);
              }}
            >
              Продолжить
            </Button>
            <Button
              variant='outlined'
              onClick={() => setOpenRemoveMenuModal(false)}
            >
              Отмена
            </Button>
          </Box>
        </Box>
      </CustomModal>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {fullMenu.map(({ id, meal, totalKcal }) => (
          <ListItem key={id} sx={{ padding: 0, position: 'relative' }}>
            <Button
              sx={{ position: 'absolute', right: 0, top: 8 }}
              onClick={() => {
                setOpenRemoveMenuModal(true);
                setSelectedMenuId(id);
              }}
            >
              <CancelPresentationIcon color='primary' />
            </Button>
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
    </>
  );
});

export default MyMenu;
