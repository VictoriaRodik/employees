import GradeSalaryList from "../components/gradeSalaryComponents/GradeSalaryList";
import { Typography, Box, Paper } from "@mui/material";

const GradeSalariesPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Оклади
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <GradeSalaryList />
      </Paper>
    </Box>
  );
};

export default GradeSalariesPage;
