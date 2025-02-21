import { EmployeeInterface, ApiEmployee } from "../types/employee";

export const mapToApiEmployee = (employee: EmployeeInterface) => ({
  id: employee.id,
  full_name: employee.fullName,
  tax_id: employee.taxId,
  address: employee.address,
  personnel_number: employee.personnelNumber,
  passport_series: employee.passportSeries,
  passport_number: employee.passportNumber,
  passport_issue_date: employee.passportIssueDate,
  passport_issued_by: employee.passportIssuedBy,
});

export const mapFromApiEmployee = (
  employee: ApiEmployee
): EmployeeInterface => ({
  id: employee.id,
  fullName: employee.full_name,
  taxId: employee.tax_id,
  address: employee.address,
  personnelNumber: employee.personnel_number,
  passportSeries: employee.passport_series,
  passportNumber: employee.passport_number,
  passportIssueDate: employee.passport_issue_date,
  passportIssuedBy: employee.passport_issued_by,
});
