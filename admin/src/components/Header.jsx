import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

function Header({ handleDrawerToggle }) {
  const isMobile = useMediaQuery('(max-width:900px)');

  return (
    <Box sx={{ height: '70px', background: '#5c5cab', width: '100%', display: 'flex', alignItems: 'center', padding: '0px 20px' }}>
      {isMobile && (
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white', mr: 2 }}>
          <MenuIcon />
        </IconButton>
      )}
      <Typography variant='h5' color='#fff'>
        Admin
      </Typography>
    </Box>
  );
}

export default Header;
