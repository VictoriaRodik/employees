import { OrganizationInterface } from "../types/organization";

export const organizationFormatted = (
  org?: Partial<OrganizationInterface>
): OrganizationInterface => ({
  id: org?.id ?? 0,
  name: org?.name ?? "",
  shortName: org?.shortName ?? "",
  edrpouCode: org?.edrpouCode ?? "",
  address: org?.address ?? "",
  phone: org?.phone ?? "",
  bankAccount: org?.bankAccount ?? "",
  bankName: org?.bankName ?? "",
  foundationDoc: org?.foundationDoc ?? "",
  directorPosition: org?.directorPosition ?? "",
  directorFullName: org?.directorFullName ?? "",
});
