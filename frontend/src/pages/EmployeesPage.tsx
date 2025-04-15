import EmployeeList from "../components/employeeComponents/EmployeeList";
import { Typography, Box, Paper } from "@mui/material";

const EmployeesPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Співробітники
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <EmployeeList />
      </Paper>
    </Box>
  );
};

export default EmployeesPage;
