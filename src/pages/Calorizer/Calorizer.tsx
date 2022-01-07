import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputAdornment,
  Input,
  Box,
  Divider,
  Paper,
  Stack,
} from '@mui/material';
import { CalculateOutlined } from '@mui/icons-material';
import Odometer from 'react-odometerjs';

import classes from './Calorizer.module.scss';
import './odometer-car.css';
import userStore from '../../store/UserStore';

const Calorizer: FC = observer(() => {
  const { userWeight, setUserWeight, userKcal, setUserKcal } = userStore;
  const [pfc, setPfc] = useState({
    p: 0,
    f: 0,
    c: 0,
  });

  useEffect(() => {
    setUserKcal(+Math.round(+userWeight * 26));
  }, [userWeight]);

  useEffect(() => {
    setPfc({
      p: (userKcal / 100) * 30,
      f: (userKcal / 100) * 10,
      c: (userKcal / 100) * 60,
    });
  }, [userKcal]);

  const pfcStack = [
    { label: 'Жиры', percent: 10, padding: '4px 8px', fontSize: '16px' },
    { label: 'Белки', percent: 30, padding: '8px 12px', fontSize: '18px' },
    { label: 'Углеводы', percent: 60, padding: '12px 16px', fontSize: '20px' },
  ];

  const { p, f, c } = pfc;

  const calcPortion = (requiredKcal: number, productKcal: number): number => {
    return (requiredKcal * 100) / productKcal;
  };

  const firstMeal = {
    carbs: calcPortion(c / 4, 360),
    protein: calcPortion(p / 5, 110),
  };
  const secondMeal = calcPortion(c / 4, 360);
  const thirdMeal = calcPortion(c / 4, 360);
  const fourthMeal = calcPortion(c / 4, 360);
  const fifthMeal = calcPortion(c / 4, 360);
  console.log(firstMeal);

  // console.log(p / 5);
  // console.log(f / 3);

  return (
    <div className={classes.calorizerWrapper}>
      <Card sx={{ width: 'max-content' }} elevation={2}>
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
        <Divider variant='middle' />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography>Укажите свой вес</Typography>
            <FormControl
              variant='standard'
              size='small'
              sx={{ width: '100px' }}
            >
              <Input
                type='number'
                id='standard-adornment-weight'
                sx={{
                  padding: '0 0 0 5px',
                  '& .MuiInput-input': { padding: '0' },
                }}
                value={userWeight}
                onChange={(e) => {
                  setUserWeight(+e.target.value < 0 ? '0' : e.target.value);
                }}
                endAdornment={
                  <InputAdornment position='end'>кг</InputAdornment>
                }
                inputProps={{
                  'aria-label': 'weight',
                }}
              />
            </FormControl>
          </Box>
          {+userWeight !== 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ mr: 2, mb: 1 }}>
                Количество калорий в сутки
              </Typography>
              <Typography
                variant='h6'
                component='span'
                sx={{ lineHeight: 1.3, fontSize: '26px' }}
              >
                {/* <Paper
                  sx={{
                    p: 2,
                    boxShadow:
                      '0px 3px 1px -2px var(--primary),0px 2px 4px 0px var(--primary),0px 1px 5px 0px var(--primary)',
                  }}
                  elevation={4}
                > */}
                <Odometer
                  value={Math.round(+userWeight * 26)}
                  format='d'
                  theme='car'
                />
                {/* {Math.round(+userWeight * 26)} ккал */}
                {/* </Paper> */}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ mb: 1 }}>Соотношение БЖУ</Typography>
            <Stack
              direction='row'
              // divider={<Divider orientation='vertical' flexItem />}
              spacing={2}
              sx={{ alignItems: 'flex-end' }}
            >
              {pfcStack.map(({ label, padding, percent, fontSize }) => (
                <Paper
                  key={label}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'max-content',
                    padding,
                  }}
                  elevation={3}
                >
                  <Typography sx={{ fontSize }}>{label}</Typography>
                  <Typography sx={{ fontSize }}>
                    {Math.round((+userKcal / 100) * percent)} ккал
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
});

export default Calorizer;
