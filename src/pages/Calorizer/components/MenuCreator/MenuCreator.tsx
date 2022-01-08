import React, { FC } from 'react';
import { Card, Divider } from '@mui/material';

import MenuCreatorHeader from '../MenuCreatorHeader';
import MenuCreatorBody from '../MenuCreatorBody';

const MenuCreator: FC = () => {
  return (
    <Card elevation={2}>
      <MenuCreatorHeader />
      <Divider variant='middle' />
      <MenuCreatorBody />
    </Card>
  );
};

export default MenuCreator;
