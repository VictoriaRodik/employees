import EmploymentConditionList from "../components/employmentConditionComponents/EmploymentConditionList";
import { Typography, Box, Paper } from "@mui/material";

const EmploymentConditionsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Умови прийняття на роботу
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <EmploymentConditionList />
      </Paper>
    </Box>
  );
};

export default EmploymentConditionsPage;
