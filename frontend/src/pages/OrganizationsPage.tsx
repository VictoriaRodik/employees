import OrganizationList from '../components/organizationComponents/OrganizationList';
import BasePage from './BasePage';

const OrganizationsPage = () => {
  return (
    <BasePage title="Картка організації">
      <OrganizationList />
    </BasePage>
  );
};

export default OrganizationsPage;