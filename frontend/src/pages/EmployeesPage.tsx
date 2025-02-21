import EmployeeList from '../components/employeeComponents/EmployeeList';
import { Typography, Box } from '@mui/material';

const EmployeesPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Співробітники
      </Typography>
      <EmployeeList />
    </Box>
  );
};

export default EmployeesPage;