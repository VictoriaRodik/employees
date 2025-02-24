import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from './components/Layout';
import EmployeesPage from './pages/EmployeesPage';
import ContractsPage from './pages/ContractsPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { registerPDFFonts } from './config/pdfFonts';


registerPDFFonts();

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/employees" replace />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="contracts" element={<ContractsPage />} />
              <Route path="*" element={<Navigate to="/employees" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
