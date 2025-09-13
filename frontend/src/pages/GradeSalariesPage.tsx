import GradeSalaryList from "../components/gradeSalaryComponents/GradeSalaryList";
import BasePage from "./BasePage";

const GradeSalariesPage = () => {
  return (
    <BasePage title="Оклади">
      <GradeSalaryList />
    </BasePage>
  );
};

export default GradeSalariesPage;
