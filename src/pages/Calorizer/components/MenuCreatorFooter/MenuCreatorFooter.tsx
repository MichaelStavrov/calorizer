import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Box, Button, Paper } from '@mui/material';

import UserStore from '../../../../store/UserStore';
import { MealToMenuForOneDay } from '../../../../types';

const MenuCreatorFooter: FC = observer(() => {
  const {
    mealsNumber,
    setMealsNumber,
    menuForOneDay,
    addToFullMenu,
    resetMenuForOneDay,
  } = UserStore;

  const [totalKCal, setTotalKcal] = useState({
    totalCarbs: 0,
    totalProteins: 0,
    totalFats: 0,
    total: 0,
  });

  useEffect(() => {
    const getKcal = (
      products: MealToMenuForOneDay[],
      value: 'carb' | 'proteins' | 'fats'
    ) => {
      return products.reduce((acc, item) => {
        if (item[value].currentKcal) {
          return acc + Number(item[value].currentKcal);
        }
        return acc;
      }, 0);
    };

    const totalCarbs = getKcal(Object.values(menuForOneDay), 'carb');
    const totalProteins = getKcal(Object.values(menuForOneDay), 'proteins');
    const totalFats = getKcal(Object.values(menuForOneDay), 'fats');
    const total = totalCarbs + totalProteins + totalFats;

    setTotalKcal((prev) => ({
      ...prev,
      totalCarbs,
      totalProteins,
      totalFats,
      total,
    }));
  }, [menuForOneDay]);

  const handleSubmitNewMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToFullMenu(totalKCal.total);
    resetMenuForOneDay();
    setMealsNumber(5);
    setTotalKcal({
      totalCarbs: 0,
      totalProteins: 0,
      totalFats: 0,
      total: 0,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          padding: '16px',
          fontSize: '22px',
          fontWeight: 700,
        }}
      >
        <Box component='span'>Всего:</Box>
        <Box>Углеводов {totalKCal.totalCarbs} ккал</Box>
        <Box>Белков {totalKCal.totalProteins} ккал</Box>
        <Box>Жиров {totalKCal.totalFats} ккал</Box>
        <Box sx={{ fontSize: 30, marginLeft: 'auto' }}>
          Итого: {totalKCal.total}
          ккал
        </Box>
      </Paper>
      <Box sx={{ display: 'flex', gap: '32px  ' }}>
        <Button variant='contained' type='submit' onClick={handleSubmitNewMenu}>
          Сохранить в мое меню
        </Button>
        <Button
          variant='outlined'
          type='button'
          onClick={() => setMealsNumber(mealsNumber + 1)}
        >
          Добавить прием пищи
        </Button>
      </Box>
    </Box>
  );
});

export default MenuCreatorFooter;
