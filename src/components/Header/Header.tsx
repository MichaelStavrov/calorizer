import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Button } from '@mui/material';

import classes from './Header.module.scss';
import logoIcon from '../../assests/images/logo.png';

const navigation = [
  { id: 1, label: 'Калоризатор', Component: Link, to: 'calorizer' },
  { id: 2, label: 'Таблица продуктов', Component: Link, to: '/' },
];

const Header: FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'primary.main',
      }}
    >
      <Container
        className={classes.headerContent}
        sx={{ display: 'flex' }}
        maxWidth='lg'
      >
        <div className={classes.iconWrapper}>
          <img className={classes.logoIcon} src={logoIcon} alt='логотип' />
        </div>
        <nav>
          <ul className={classes.navList}>
            {navigation.map(({ id, label, Component, to }) => (
              <li key={id}>
                <Button
                  component={Component}
                  to={to}
                  sx={{
                    color: 'var(--white)',
                    padding: '24px 8px',
                    transition: 'all .2s ease-in-out',
                    ':hover': {
                      backgroundColor: 'primary.dark',
                      transition: 'all .2s ease-in-out',
                    },
                  }}
                >
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Box>
  );
};

export default Header;
