import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import classes from './App.module.css';
import Header from './components/Header';
import Main from './components/Main';
import Calorizer from './pages/Calorizer';
import MyMenu from './pages/MyMenu';
import Products from './pages/Products';

const App: FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Calorizer />} />
          <Route path='/products' element={<Products />} />
          <Route path='/menu' element={<MyMenu />} />
        </Routes>
      </Main>
    </>
  );
};

export default App;
