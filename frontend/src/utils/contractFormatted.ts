import { ContractInterface } from "../types/contract";

export const contractFormatted = (
  contract?: Partial<ContractInterface>
): ContractInterface => ({
  id: contract?.id ?? 0,
  employeeId: contract?.employeeId ?? "",
  contractDate: contract?.contractDate
    ? new Date(contract.contractDate).toLocaleDateString("en-CA")
    : new Date().toLocaleDateString("en-CA"),
  contractEndDate: contract?.contractEndDate
    ? new Date(contract.contractEndDate).toLocaleDateString("en-CA")
    : new Date().toLocaleDateString("en-CA"),
  contractAmount: contract?.contractAmount ?? "",
  contractContent: contract?.contractContent ?? "",
  contractNumber: contract?.contractNumber ?? "",
  taxId: contract?.taxId ?? "",
  fullName: contract?.fullName ?? "",
  address: contract?.address ?? "",
  passportSeries: contract?.passportSeries ?? "",
  passportNumber: contract?.passportNumber ?? "",
  passportIssueDate: contract?.passportIssueDate
    ? new Date(contract.passportIssueDate).toLocaleDateString("en-CA")
    : new Date().toLocaleDateString("en-CA"),
  passportIssuedBy: contract?.passportIssuedBy ?? "",
  organizationId: contract?.organizationId ?? "",
  name: contract?.name ?? "",
  shortName: contract?.shortName ?? "",
  edrpouCode: contract?.edrpouCode ?? "",
  legalAddress: contract?.legalAddress ?? "",
  phone: contract?.phone ?? "",
  bankAccount: contract?.bankAccount ?? "",
  bankName: contract?.bankName ?? "",
  foundationDoc: contract?.foundationDoc ?? "",
  directorPosition: contract?.directorPosition ?? "",
  directorFullName: contract?.directorFullName ?? "",
});
