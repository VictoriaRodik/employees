import { Typography, Box, Paper } from '@mui/material';
import ContractList from '../components/contractComponents/ContractList';

const ContractsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Договори
      </Typography>
      <Paper sx={{ 
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2
      }}>
        <ContractList />
      </Paper>
    </Box>
  );
};

export default ContractsPage;