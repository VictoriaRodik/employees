import ContractList from '../components/contractComponents/ContractList';
import { Typography, Box } from '@mui/material';

const ContractsPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Договори
      </Typography>
      <ContractList />
    </Box>
  );
};

export default ContractsPage;