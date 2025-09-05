import EmployeeList from "../components/employeeComponents/EmployeeList";
import { Typography, Box, Paper, Stack } from "@mui/material";
import ExportProfilesButton from "../components/employeeComponents/ExportProfilesButton";
import { useEmployees } from "../hooks/useEmployees";

const EmployeesPage = () => {
  const { data: employees = [] } = useEmployees();


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
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ m: 4 }}>
          <ExportProfilesButton employees={employees} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default EmployeesPage;
