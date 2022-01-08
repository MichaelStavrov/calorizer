import { CSSProperties } from '@mui/styled-engine';
import React, { SetStateAction } from 'react';

export interface SearchProps {
  items: any[];
  value: string | null;
  setValue: (value: string) => void;
  label?: string;
  sx?: CSSProperties;
}
