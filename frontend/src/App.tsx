import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import EmployeesPage from "./pages/EmployeesPage";
import ContractsPage from "./pages/ContractsPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { registerPDFFonts } from "./config/pdfFonts";
import OrganizationsPage from "./pages/OrganizationsPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import PositionsPage from "./pages/PositionsPage";
import EmploymentConditionsPage from "./pages/EmploymentConditionsPage";
import Login from "./pages/Login";
import RequireAuth from "./components/auth/RequireAuth";
import EmploymentTypesPage from "./pages/EmploymentTypesPage";
import WorkSchedulesPage from "./pages/WorkSchedulesPage";
import QualificationGradesPage from "./pages/QualificationGradesPage";
import GradeSalarysPage from "./pages/GradeSalariesPage";

registerPDFFonts();
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route index element={<Navigate to="/employees" replace />} />
              <Route
                path="employees"
                element={
                  <RequireAuth>
                    <EmployeesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="contracts"
                element={
                  <RequireAuth>
                    <ContractsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="organizations"
                element={
                  <RequireAuth>
                    <OrganizationsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="departments"
                element={
                  <RequireAuth>
                    <DepartmentsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="positions"
                element={
                  <RequireAuth>
                    <PositionsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="employment-conditions"
                element={
                  <RequireAuth>
                    <EmploymentConditionsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="employment-types"
                element={
                  <RequireAuth>
                    <EmploymentTypesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="work-schedules"
                element={
                  <RequireAuth>
                    <WorkSchedulesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="qualification-grades"
                element={
                  <RequireAuth>
                    <QualificationGradesPage />
                  </RequireAuth>
                }
              />
              <Route
                path="grade-salaries"
                element={
                  <RequireAuth>
                    <GradeSalarysPage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to="/employees" replace />} />
            </Route>
          </Routes>
          ;
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
