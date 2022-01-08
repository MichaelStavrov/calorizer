import React, { FC } from 'react';
import { CardHeader } from '@mui/material';
import { CalculateOutlined } from '@mui/icons-material';

const CalCalcCardHeader: FC = () => {
  return (
    <CardHeader
      avatar={<CalculateOutlined />}
      title='Расчет калорий для похудения'
      component='h1'
      sx={{
        padding: '16px 16px 4px 16px',
        lineHeight: 1.1,
        display: 'flex',
        alignItems: 'flex-end',
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
      }}
    />
  );
};

export default CalCalcCardHeader;
