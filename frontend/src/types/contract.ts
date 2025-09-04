export interface ContractInterface {
  id: number;
  employeeId: string;
  contractDate: string;
  contractEndDate: string;
  contractAmount: string;
  contractContent: string;
  contractNumber: string;
  taxId: string;
  fullName: string;
  address?: string;
  passportSeries?: string;
  passportNumber: string;
  passportIssueDate: string;
  passportIssuedBy: string;
  organizationId: string;
  name: string;
  shortName: string;
  edrpouCode: string;
  legalAddress: string;
  phone: string;
  bankAccount: string;
  bankName: string;
  foundationDoc: string;
  directorPosition: string;
  directorFullName: string;
}

export interface ApiContract {
  id: number;
  employee_id: string;
  contract_date: string;
  contract_end_date: string;
  contract_amount: string;
  contract_content: string;
  contract_number: string;
  full_name: string;
  tax_id: string;
  address?: string;
  personnel_number?: string;
  passport_series?: string;
  passport_number: string;
  passport_issue_date: string;
  passport_issued_by: string;
  organization_id: string;
  name: string;
  short_name: string;
  edrpou_code: string;
  legal_address: string;
  phone: string;
  bank_account: string;
  bank_name: string;
  foundation_doc: string;
  director_position: string;
  director_full_name: string;
}
