import { EmployeeInterface, ApiEmployee} from "../types/employee";

export const mapToApiEmployee = (employee: EmployeeInterface) => ({
  id: employee.id,
  full_name: employee.fullName,
  tax_id: employee.taxNumber,
  personnel_number: employee.personnelNumber,
  passport_series: employee.passportSeries,
  passport_number: employee.passportNumber,
  passport_issue_date: employee.passportIssueDate,
  passport_issued_by: employee.passportIssuedBy,
});

export const mapFromApiEmployee = (data: ApiEmployee): EmployeeInterface => ({
  id: data.id,
  fullName: data.full_name,
  taxNumber: data.tax_id,
  personnelNumber: data.personnel_number,
  passportSeries: data.passport_series,
  passportNumber: data.passport_number,
  passportIssueDate: data.passport_issue_date,
  passportIssuedBy: data.passport_issued_by,
});
