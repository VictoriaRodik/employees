export interface OrganizationInterface {
  id: number;
  name: string;
  shortName: string;
  edrpouCode: string;
  address: string;
  phone: string;
  bankAccount: string;
  bankName: string;
  foundationDoc: string;
  directorPosition: string;
  directorFullName: string;
}

export interface ApiOrganization {
  id: number;
  name: string;
  short_name: string;
  edrpou_code: string;
  address: string;
  phone: string;
  bank_account: string;
  bank_name: string;
  foundation_doc: string;
  director_position: string;
  director_full_name: string;
}
