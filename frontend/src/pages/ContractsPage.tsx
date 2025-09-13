import ContractList from '../components/contractComponents/ContractList';
import BasePage from './BasePage';

const ContractsPage = () => {
  return (
    <BasePage title="Договори">
      <ContractList />
    </BasePage>
  );
};

export default ContractsPage;