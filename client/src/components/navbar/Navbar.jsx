import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout, notify } from '../../utils/HelperFunctions';
import LogoutIcon from "@mui/icons-material/Logout";
const pages = [
  {
    name: 'Home',
    url: '/'
  },

  // {
  //   name: 'Chatbot',
  //   url: '/chatbot'
  // },

  {
    name: 'Login',
    url: '/login'
  },
  {
    name: 'signup',
    url: '/signup'
  },
]
const settings = [
  //   {
  //   name: 'Profile',
  //   url: '/profile'
  // },  
  {
    name: 'Logout',
    url: '/logout'
  }];

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  return (
    <AppBar position="static" sx={{ background: "linear-gradient(135deg, #40b77d, #34a3c8)" }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{display:'flex',justifyContent:'space-between'}}>

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={'/'} style={{ color: '#fff' }}>
              HealthMate
            </Link>
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages
                .filter((page) => {
                  if (user && (page.name === 'Login' || page.name === 'signup')) return false
                  return true
                })
                .map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link to={page.url}>
                      <Typography sx={{ textAlign: 'center',color: '#000' }}>{page.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box> */}

          {/* windows */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={'/'} style={{ color: '#fff' }}>
              HealthMate
            </Link>
          </Typography>

          <Button
            variant="contained"
            sx={{
              minWidth: 0,
              width: 48,
              height: 48,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 2,
            }}
          >
            <Tooltip title="Logout" arrow>
              <LogoutIcon />
            </Tooltip>
          </Button>
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages
              .filter((page) => {
                if (user && (page.name === 'Login' || page.name === 'signup')) return false
                return true
              })
              .map((page) => (
                <Link key={page.name} to={page.url}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: '#fff', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
          </Box> */}
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, i) => {
                if (setting.name === 'Logout' && !user) return null; // hide logout if no user
                return (
                  <MenuItem
                    key={i}
                    onClick={() => {
                      if (setting.name === 'Logout') {
                        handleLogout(navigate, dispatch);
                      } else {
                        navigate(`${setting.url}`);
                        handleCloseUserMenu();
                      }
                    }}
                  >
                    <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
