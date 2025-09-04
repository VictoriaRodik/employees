import PositionList from "../components/positionComponents/PositionList";
import { Typography, Box, Paper } from "@mui/material";

const PositionsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Посади
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <PositionList />
      </Paper>
    </Box>
  );
};

export default PositionsPage;
