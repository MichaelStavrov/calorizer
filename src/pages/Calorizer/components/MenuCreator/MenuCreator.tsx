import React, { FC } from 'react';
import { Card, Divider } from '@mui/material';

import MenuCreatorHeader from '../MenuCreatorHeader';
import MenuCreatorBody from '../MenuCreatorBody';
import MenuCreatorFooter from '../MenuCreatorFooter';

const MenuCreator: FC = () => {
  return (
    <>
      <Card variant='outlined'>
        <MenuCreatorHeader />
        <Divider variant='middle' />
        <MenuCreatorBody />
      </Card>
      <MenuCreatorFooter />
    </>
  );
};

export default MenuCreator;
