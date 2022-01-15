import React, { FC } from 'react';
import { Box, Modal } from '@mui/material';

import { CustomModalProps } from './types';

const CustomModal: FC<CustomModalProps> = ({ children, open, closeModal }) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };

  const handleCloseModal = (
    e: React.MouseEvent<HTMLElement>,
    reason: string
  ) => {
    if (reason !== 'backdropClick') {
      closeModal();
    }
  };

  return (
    <Modal open={open} onClose={handleCloseModal} aria-labelledby='модалка'>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
