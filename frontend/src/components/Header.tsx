import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface HeaderProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  showMenuButton: boolean;
}

const Header = ({
  onMenuClick,
  isDarkMode,
  toggleTheme,
  showMenuButton,
}: HeaderProps) => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      {showMenuButton && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}
      >
        <Box
          component="img"
          src="/vite.svg"
          alt="logo"
          sx={{ height: 32, width: 32 }}
        />
        Система управління договорами
      </Typography>
      <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Header;
