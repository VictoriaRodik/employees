import { EmployeeInterface } from "../types/employee";

export const employeeFormatted = (
  employee?: Partial<EmployeeInterface>
): EmployeeInterface => ({
  id: employee?.id ?? 0,
  taxId: employee?.taxId ?? "",
  fullName: employee?.fullName ?? "",
  address: employee?.address ?? "",
  passportSeries: employee?.passportSeries ?? "",
  passportNumber: employee?.passportNumber ?? "",
  passportIssueDate: employee?.passportIssueDate
    ? new Date(employee.passportIssueDate).toLocaleDateString("en-CA")
    : new Date().toLocaleDateString("en-CA"),
  passportIssuedBy: employee?.passportIssuedBy ?? "",
  personnelNumber: employee?.personnelNumber ?? "",
});
