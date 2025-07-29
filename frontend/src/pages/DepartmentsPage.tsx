// Update the import path below if the actual path or filename is different (check for typos or case sensitivity)
import DepartmentList from "../components/depertmentComponents/DepartmentList";
import { Typography, Box, Paper } from "@mui/material";

const DepartmentsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Підрозділи
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <DepartmentList />
      </Paper>
    </Box>
  );
};

export default DepartmentsPage;
