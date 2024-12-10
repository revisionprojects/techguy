import React from 'react';
import { Typography } from '@mui/material';

const Header = ({ title }) => {
  return (
    <Typography variant="h4" className="text-center mb-6">
      {title}
    </Typography>
  );
};

export default Header;