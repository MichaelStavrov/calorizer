import React, { FC } from 'react';
import { Container } from '@mui/material';

const Main: FC = ({ children }) => {
  return <Container maxWidth='lg'>{children}</Container>;
};

export default Main;
