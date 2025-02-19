import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmployeeList from "./components/employeeComponents/EmployeeList";

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <EmployeeList />
      </QueryClientProvider>
  );
}

export default App;
