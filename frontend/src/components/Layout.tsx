import { Box, AppBar, Toolbar, Typography, Container, Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, useTheme } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme as useCustomTheme } from '../context/ThemeContext';

const drawerWidth = 240;

const Layout = () => {
  const { isDarkMode, toggleTheme } = useCustomTheme();

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
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
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItemButton 
              component={Link} 
              to="/employees"
              sx={{ color: 'text.primary' }}
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
            >
              <ListItemIcon>
                <DescriptionIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Договори" />
            </ListItemButton>
          </List>
        </Box>
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