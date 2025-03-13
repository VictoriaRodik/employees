import { Box, AppBar, Toolbar, Typography, Container, Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../hooks/useTheme';
import { useState } from 'react';

const drawerWidth = 240;

const Layout = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItemButton
          component={Link}
          to="/employees"
          sx={{ color: 'text.primary' }}
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Співробітники" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/contracts"
          sx={{ color: 'text.primary' }}
          onClick={() => setMobileOpen(false)}
        >
          <ListItemIcon>
            <DescriptionIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Договори" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      <AppBar position="fixed" sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1 
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1 
          }}>
            <Box component="img" src="/vite.svg" sx={{ height: 32, width: 32 }} alt="logo" />
            Система управління договорами
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>


      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper'
          },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>


      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' }, 
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            bgcolor: 'background.paper'
          },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>

      <Box component="main" sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: 'background.default',
        minHeight: '100vh'
      }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;