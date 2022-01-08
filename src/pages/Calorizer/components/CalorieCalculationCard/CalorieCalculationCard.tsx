import React, { FC } from 'react';
import { Card, Divider } from '@mui/material';

import CalCalcCardHeader from '../CalCalcCardHeader';
import CalCalcCardContent from '../CalCalcCardContent';

const CalorieCalculationCard: FC = () => {
  return (
    <Card sx={{ width: 'max-content' }} elevation={2}>
      <CalCalcCardHeader />
      <Divider variant='middle' />
      <CalCalcCardContent />
    </Card>
  );
};

export default CalorieCalculationCard;
