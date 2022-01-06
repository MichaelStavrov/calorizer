import React, { SetStateAction } from 'react';

export interface SearchProps {
  items: any[];
  value: string | null;
  setValue: React.Dispatch<SetStateAction<string | null>>;
}
