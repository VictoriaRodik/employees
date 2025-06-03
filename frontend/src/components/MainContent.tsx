import { Box, Toolbar, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

interface MainContentProps {
  drawerWidth: number;
}

const MainContent = ({ drawerWidth }: MainContentProps) => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
      bgcolor: "background.default",
      minHeight: "100vh",
      width: { sm: `calc(100% - ${drawerWidth}px)` },
    }}
  >
    <Toolbar />
    <Container maxWidth="lg">
      <Outlet />
    </Container>
  </Box>
);

export default MainContent;
