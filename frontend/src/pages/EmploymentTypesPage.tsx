import EmploymentTypeList from "../components/employmentTypeComponents/EmploymentTypeList";
import BasePage from "./BasePage";

const EmploymentTypesPage = () => {
  return (
    <BasePage title="Умови роботи">
      <EmploymentTypeList />
    </BasePage>
  );
};

export default EmploymentTypesPage;
