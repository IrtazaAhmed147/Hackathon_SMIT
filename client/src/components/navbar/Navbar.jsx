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
import api from '../../utils/common.js'
import { useDispatch, useSelector } from 'react-redux';
import { userReset } from '../../redux/slices/authSlice';
import { notify } from '../../utils/HelperFunctions';
import { resetReports } from '../../redux/slices/reportSlice.js';
import { resetAi } from '../../redux/slices/aiSlice.js';
import { resetFamilyMembers } from '../../redux/slices/familyMemberSlice.js';
import { resetVitals } from '../../redux/slices/vitalSlice.js';

const pages = [
  {
    name: 'Home',
    url: '/'
  },

  {
    name: 'Chatbot',
    url: '/chatbot'
  },

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


  const handleLogout = async () => {
    try {
      // const res = await api.get('/auth/logout', {
      //   withCredentials: true
      // })

      localStorage.removeItem('user')
      localStorage.removeItem('token')
      dispatch(userReset())
      dispatch(resetReports())
      dispatch(resetAi())
      dispatch(resetFamilyMembers())
      dispatch(resetVitals())
      navigate('/login')

      notify('success', 'User logged out successfully')

    } catch (error) {
      console.log(error);
      notify('error', error.message)

    }

  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ background: "linear-gradient(135deg, #40b77d, #34a3c8)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* <Typography
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
            <Link to={'/'} style={{color:'rgb(216 216 216)'}}>
              HealthMate
            </Link>
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                      <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          {/* windows */}
          {/* <Typography
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
            <Link to={'/'} style={{color:'rgb(216 216 216)'}}>
              HealthMate
            </Link>
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {/* profile image */}
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
                        handleLogout();
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
