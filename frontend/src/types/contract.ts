export interface ContractInterface {
  id: number;
  taxNumber: string;
  fullName: string;
  address?: string;
  passportSeries?: string;
  passportNumber: string;
  passportIssueDate: string;
  passportIssuedBy: string;
  personnelNumber: string;
}

export interface ApiContract
 {
  id: number;
  full_name: string;
  tax_id: string;
  address?: string;
  personnel_number: string;
  passport_series?: string;
  passport_number: string;
  passport_issue_date: string;
  passport_issued_by: string;

}
