import { RouteObject } from "react-router-dom";
import EmployeesPage from "../pages/EmployeesPage";
import ContractsPage from "../pages/ContractsPage";
import OrganizationsPage from "../pages/OrganizationsPage";
import DepartmentsPage from "../pages/DepartmentsPage";
import PositionsPage from "../pages/PositionsPage";
import EmploymentConditionsPage from "../pages/EmploymentConditionsPage";
import EmploymentTypesPage from "../pages/EmploymentTypesPage";
import WorkSchedulesPage from "../pages/WorkSchedulesPage";
import QualificationGradesPage from "../pages/QualificationGradesPage";
import GradeSalarysPage from "../pages/GradeSalariesPage";
import ReferenceSourcesPage from "../pages/ReferenceSourcesPage";
import OrdersPage from "../pages/OrdersPage";
import OrderSettingsPage from "../pages/OrderSettingsPage";
import RequireAuth from "../components/auth/RequireAuth";

export const protectedRoutes: RouteObject[] = [
  {
    path: "employees",
    element: (
      <RequireAuth>
        <EmployeesPage />
      </RequireAuth>
    ),
  },
  {
    path: "contracts",
    element: (
      <RequireAuth>
        <ContractsPage />
      </RequireAuth>
    ),
  },
  {
    path: "organizations",
    element: (
      <RequireAuth>
        <OrganizationsPage />
      </RequireAuth>
    ),
  },
  {
    path: "departments",
    element: (
      <RequireAuth>
        <DepartmentsPage />
      </RequireAuth>
    ),
  },
  {
    path: "positions",
    element: (
      <RequireAuth>
        <PositionsPage />
      </RequireAuth>
    ),
  },
  {
    path: "employment-conditions",
    element: (
      <RequireAuth>
        <EmploymentConditionsPage />
      </RequireAuth>
    ),
  },
  {
    path: "employment-types",
    element: (
      <RequireAuth>
        <EmploymentTypesPage />
      </RequireAuth>
    ),
  },
  {
    path: "work-schedules",
    element: (
      <RequireAuth>
        <WorkSchedulesPage />
      </RequireAuth>
    ),
  },
  {
    path: "qualification-grades",
    element: (
      <RequireAuth>
        <QualificationGradesPage />
      </RequireAuth>
    ),
  },
  {
    path: "grade-salaries",
    element: (
      <RequireAuth>
        <GradeSalarysPage />
      </RequireAuth>
    ),
  },
  {
    path: "reference-sources",
    element: (
      <RequireAuth>
        <ReferenceSourcesPage />
      </RequireAuth>
    ),
  },
  {
    path: "orders",
    element: (
      <RequireAuth>
        <OrdersPage />
      </RequireAuth>
    ),
  },
  {
    path: "order-settings",
    element: (
      <RequireAuth>
        <OrderSettingsPage />
      </RequireAuth>
    ),
  },
];
