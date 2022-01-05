import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import classes from './App.module.css';
import Header from './components/Header';
import Main from './components/Main';
import Calorizer from './pages/Calorizer';
import Products from './pages/Products';

const App: FC = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/calorizer' element={<Calorizer />} />
        </Routes>
      </Main>
    </>
  );
};

export default App;
