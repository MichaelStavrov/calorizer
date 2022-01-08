import React, { FC } from 'react';
import { CardHeader } from '@mui/material';
import { RestaurantMenu } from '@mui/icons-material';

const MenuCreatorHeader: FC = () => {
  return (
    <CardHeader
      avatar={<RestaurantMenu />}
      title='Добавить новое меню на день'
      component='h1'
      sx={{
        padding: '16px 16px 4px 16px',
        lineHeight: 1.1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        '& .MuiCardHeader-title': {
          fontSize: '24px',
        },
        '& .MuiCardHeader-avatar': {
          marginRight: '8px',
          marginBottom: '-5px',
          color: 'primary.main',
        },
        '& .MuiSvgIcon-root': {
          height: '50px',
          width: '40px',
        },
        '& .MuiCardHeader-content': {
          textAlign: 'center',
          flex: 'none',
        },
      }}
    />
  );
};

export default MenuCreatorHeader;
