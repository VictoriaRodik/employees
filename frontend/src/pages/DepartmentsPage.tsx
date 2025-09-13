import DepartmentList from "../components/departmentComponents/DepartmentList";
import BasePage from "./BasePage";

const DepartmentsPage = () => {
  return (
    <BasePage title="Підрозділи">
      <DepartmentList />
    </BasePage>
  );
};

export default DepartmentsPage;
