import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";
import BusinessIcon from "@mui/icons-material/Business";

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

  const navItems = [
    {
      to: "/employees",
      label: "Співробітники",
      icon: <PeopleIcon color="primary" />,
    },
    {
      to: "/contracts",
      label: "Договори",
      icon: <DescriptionIcon color="primary" />,
    },
    {
      to: "/organizations",
      label: "Організації",
      icon: <BusinessIcon color="primary" />,
    },
  ];

  const drawerContent = (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {navItems.map(({ to, label, icon }) => (
          <ListItemButton
            key={to}
            component={Link}
            to={to}
            sx={{ color: "text.primary" }}
            onClick={() => !isSmUp && onDrawerToggle()}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
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
