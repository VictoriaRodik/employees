import { OrganizationInterface, ApiOrganization } from "../types/organization";

export const mapToApiOrganization = (
  org: OrganizationInterface
): ApiOrganization => ({
  id: org.id,
  name: org.name,
  short_name: org.shortName,
  edrpou_code: org.edrpouCode,
  address: org.address,
  phone: org.phone,
  bank_account: org.bankAccount,
  bank_name: org.bankName,
  foundation_doc: org.foundationDoc,
  director_position: org.directorPosition,
  director_full_name: org.directorFullName,
});

export const mapFromApiOrganization = (
  org: ApiOrganization
): OrganizationInterface => ({
  id: org.id,
  name: org.name,
  shortName: org.short_name,
  edrpouCode: org.edrpou_code,
  address: org.address,
  phone: org.phone,
  bankAccount: org.bank_account,
  bankName: org.bank_name,
  foundationDoc: org.foundation_doc,
  directorPosition: org.director_position,
  directorFullName: org.director_full_name,
});
