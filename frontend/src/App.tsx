import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import EmployeesPage from "./pages/EmployeesPage";
import ContractsPage from "./pages/ContractsPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { registerPDFFonts } from "./config/pdfFonts";
import OrganizationsPage from "./pages/OrganizationsPage";
import Login from "./pages/Login";
import RequireAuth from "./components/auth/RequireAuth";

registerPDFFonts();

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
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
