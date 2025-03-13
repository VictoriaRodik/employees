import { ContractInterface, ApiContract } from "../types/contract";

export const mapToApiContract = (contract: ContractInterface) => ({
  id: contract.id,
  employee_id: contract.employeeId,
  contract_date: contract.contractDate,
  contract_end_date: contract.contractEndDate,
  contract_amount: contract.contractAmount,
  contract_content: contract.contractContent,
  contract_number: contract.contractNumber,
  full_name: contract.fullName,
  tax_id: contract.taxId,
  passport_series: contract.passportSeries,
  passport_number: contract.passportNumber,
  passport_issue_date: contract.passportIssueDate,
  passport_issued_by: contract.passportIssuedBy,
});

export const mapFromApiContract = (
  contract: ApiContract
): ContractInterface => ({
  id: contract.id,
  employeeId: contract.employee_id,
  contractDate: contract.contract_date,
  contractEndDate: contract.contract_end_date,
  contractAmount: contract.contract_amount,
  contractContent: contract.contract_content,
  contractNumber: contract.contract_number,
  fullName: contract.full_name,
  taxId: contract.tax_id,
  passportSeries: contract.passport_series,
  passportNumber: contract.passport_number,
  passportIssueDate: contract.passport_issue_date,
  passportIssuedBy: contract.passport_issued_by,
});
