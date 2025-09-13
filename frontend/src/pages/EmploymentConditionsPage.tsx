import EmploymentConditionList from "../components/employmentConditionComponents/EmploymentConditionList";
import BasePage from "./BasePage";

const EmploymentConditionsPage = () => {
  return (
    <BasePage title="Умови прийняття на роботу">
      <EmploymentConditionList />
    </BasePage>
  );
};

export default EmploymentConditionsPage;
