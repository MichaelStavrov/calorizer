import React, { FC } from 'react';
import { Box } from '@mui/material';

import CalorieCalculationCard from './components/CalorieCalculationCard';
import MenuCreator from './components/MenuCreator';

const Calorizer: FC = () => {
  return (
    <Box
      sx={{
        padding: '20px 0 40px 0',
        display: 'flex',
        gap: '16px',
        flexDirection: 'column',
      }}
    >
      <CalorieCalculationCard />
      <MenuCreator />
    </Box>
  );
};

export default Calorizer;
