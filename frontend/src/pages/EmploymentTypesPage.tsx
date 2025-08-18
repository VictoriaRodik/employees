import EmploymentTypeList from "../components/employmentTypeComponents/EmploymentTypeList";
import { Typography, Box, Paper } from "@mui/material";

const EmploymentTypesPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Умови роботи
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <EmploymentTypeList />
      </Paper>
    </Box>
  );
};

export default EmploymentTypesPage;
