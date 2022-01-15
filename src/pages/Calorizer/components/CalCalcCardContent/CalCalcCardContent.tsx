import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Typography,
  CardContent,
  FormControl,
  InputAdornment,
  Input,
  Box,
  Paper,
  Stack,
} from '@mui/material';
import Odometer from 'react-odometerjs';

import userStore from '../../../../store/UserStore';
import '../../../../styles/odometer/odometer-minimal.css';

const CalCalcCardContent: FC = observer(() => {
  const { userWeight, setUserWeight, userKcal, setUserKcal } = userStore;

  useEffect(() => {
    setUserKcal(+Math.round(+userWeight * 26));
  }, [userWeight]);

  const pfcStack = [
    { label: 'Жиры', percent: 10, padding: '4px 8px', fontSize: '16px' },
    { label: 'Белки', percent: 30, padding: '8px 12px', fontSize: '18px' },
    { label: 'Углеводы', percent: 60, padding: '12px 16px', fontSize: '20px' },
  ];

  return (
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
        <FormControl variant='standard' size='small' sx={{ width: '70px' }}>
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
            endAdornment={<InputAdornment position='start'>кг</InputAdornment>}
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>
      </Box>
      {+userWeight !== 0 && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography>Количество калорий в сутки</Typography>
            <Typography
              component='div'
              sx={{
                lineHeight: 1.3,
                fontSize: '30px',
                color: 'primary.dark',
                fontWeight: 700,
              }}
            >
              <Odometer
                value={Math.round(+userWeight * 26)}
                format='d'
                theme='minimal'
              />
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ mb: 1 }}>Соотношение БЖУ</Typography>
            <Stack direction='row' spacing={2} sx={{ alignItems: 'flex-end' }}>
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
                  <Typography sx={{ fontSize }} component='div'>
                    <Odometer
                      value={Math.round((+userKcal / 100) * percent)}
                      format='d'
                      theme='minimal'
                    />
                    <Typography sx={{ fontSize, ml: 0.5 }} component='span'>
                      ккал
                    </Typography>
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        </>
      )}
    </CardContent>
  );
});

export default CalCalcCardContent;
