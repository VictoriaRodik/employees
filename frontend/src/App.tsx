import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmployeeList from "./components/employeeComponents/EmployeeList";
import ContractList from "./components/contractComponents/ContractList";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <EmployeeList />
      <ContractList />
    </QueryClientProvider>
  );
}

export default App;
