import { useState } from "react";
import { Box, useTheme as useMuiTheme, useMediaQuery } from "@mui/material";

import Header from "./Header";
import NavigationDrawer from "./NavigationDrawer";
import MainContent from "./MainContent";

import { useTheme } from "../hooks/useTheme";
import useTokenExpiration from "../hooks/useTokenExpiration";

const drawerWidth = 240;

const Layout = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const muiTheme = useMuiTheme();
  const isSmUp = useMediaQuery(muiTheme.breakpoints.up("sm"));

  useTokenExpiration();

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header
        onMenuClick={handleDrawerToggle}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        showMenuButton={!isSmUp}
      />
      <NavigationDrawer
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <MainContent drawerWidth={drawerWidth} />
    </Box>
  );
};

export default Layout;
