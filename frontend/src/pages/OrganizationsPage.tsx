import OrganizationList from '../components/organizationComponents/OrganizationList';
import { Typography, Box, Paper } from '@mui/material';

const OrganizationsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Організації
      </Typography>
      <Paper sx={{ 
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}>
        <OrganizationList />
      </Paper>
    </Box>
  );
};

export default OrganizationsPage;