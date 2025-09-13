import EmployeeList from "../components/employeeComponents/EmployeeList";
import { Stack } from "@mui/material";
import ExportProfilesButton from "../components/employeeComponents/ExportProfilesButton";
import { useEmployees } from "../hooks/useEmployees";
import BasePage from "./BasePage";

const EmployeesPage = () => {
  const { data: employees = [] } = useEmployees();

  return (
    <BasePage title="Співробітники">
      <EmployeeList />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ m: 4 }}>
        <ExportProfilesButton employees={employees} />
      </Stack>
    </BasePage>
  );
};

export default EmployeesPage;
