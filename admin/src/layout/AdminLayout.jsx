import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ flex: 1 }}>
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;
