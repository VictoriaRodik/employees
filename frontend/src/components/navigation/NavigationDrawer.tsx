import {
  Drawer,
  Toolbar,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import NavigationContent from "./NavigationContent";

interface NavigationDrawerProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  drawerWidth: number;
}

const NavigationDrawer = ({
  mobileOpen,
  onDrawerToggle,
  drawerWidth,
}: NavigationDrawerProps) => {
  const muiTheme = useMuiTheme();
  const isSmUp = useMediaQuery(muiTheme.breakpoints.up("sm"));

  const drawerContent = (
    <NavigationContent isSmUp={isSmUp} onDrawerToggle={onDrawerToggle} />
  );

  if (isSmUp) {
    return (
      <Drawer
        variant="permanent"
        open
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.paper",
          },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: "block", sm: "none" },
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          bgcolor: "background.paper",
        },
      }}
    >
      <Toolbar />
      {drawerContent}
    </Drawer>
  );
};

export default NavigationDrawer;
