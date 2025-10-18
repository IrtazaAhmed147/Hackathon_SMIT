import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  useMediaQuery
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import React from 'react';
import { Link } from 'react-router-dom';

const drawerWidth = 250;

function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const isMobile = useMediaQuery('(max-width:900px)');

  const list = [
    { name: 'Dashboard', url: '/' },
    { name: 'User', url: '/users' },
    { name: 'Products', url: '/products' },
    { name: 'Inbox', url: '/inbox' },
  ];

  const drawerContent = (
    <Box sx={{ width: drawerWidth }}>
      <List>
        {list.map((item, i) => (
          <Link to={item.url} key={i} style={{ color: 'black', textDecoration: 'none' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        // Desktop Permanent Drawer
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}

export default Sidebar;
