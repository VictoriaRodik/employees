export interface EmployeeProfile {
    employee: {
      id: number;
      fullName: string;
      taxId?: string;
      address?: string;
      passportSeries?: string | null;
      passportNumber?: string;
      passportIssueDate?: string;
      passportIssuedBy?: string;
      personnelNumber?: string;
    };
    currentDepartment?: {
      id: number;
      name: string;
      asOfOrder: { id: number; number: string; date: string };
    } | null;
    currentPosition?: {
      id: number;
      name: string;
      asOfOrder: { id: number; number: string; date: string };
    } | null;
    currentEmploymentType?: {
      id: number;
      name: string;
      asOfOrder: { id: number; number: string; date: string };
    } | null;
    currentEmploymentCondition?: {
      id: number;
      name: string;
      asOfOrder: { id: number; number: string; date: string };
    } | null;
    currentWorkSchedule?: {
      id: number;
      name: string;
      asOfOrder: { id: number; number: string; date: string };
    } | null;
    currentQualification?: {
      id: number;
      grade: string;
      asOfOrder: { id: number; number: string; date: string };
    } | null;
    currentGradeSalary?: {
      baseSalary?: number | string;
      effectiveFrom?: string;
      grade?: string;
    } | null;
    orderItems?: Array<{
      id: number;
      orderId: number;
      orderNumber: string;
      orderDate: string;
      orderTypeName?: string;
      fieldDefinitionName?: string;
      value?: string | null;
      valueId?: number | null;
    }>;
}

export interface ApiEmployeeProfile {
  employee: {
    id: number;
    full_name: string;
    tax_id?: string;
    address?: string;
    passport_series?: string | null;
    passport_number?: string;
    passport_issue_date?: string;
    passport_issued_by?: string;
    personnel_number?: string;
  };
  current_department?: {
    id: number;
    name: string;
    as_of_order: { id: number; number: string; date: string };
  } | null;
  current_position?: {
    id: number;
    name: string;
    as_of_order: { id: number; number: string; date: string };
  } | null;
  current_employment_type?: {
    id: number;
    name: string;
    as_of_order: { id: number; number: string; date: string };
  } | null;
  current_employment_condition?: {
    id: number;
    name: string;
    as_of_order: { id: number; number: string; date: string };
  } | null;
  current_work_schedule?: {
    id: number;
    name: string;
    as_of_order: { id: number; number: string; date: string };
  } | null;
  current_qualification?: {
    id: number;
    grade: string;
    as_of_order: { id: number; number: string; date: string };
  } | null;
  current_grade_salary?: {
    base_salary?: number | string;
    effective_from?: string;
    grade?: string;
  } | null;
  order_items?: Array<ApiOrderItem>;
}

export interface ApiOrderItem {
  id: number;
  order_id: number;
  order_number: string;
  order_date: string;
  order_type_name?: string;
  field_definition_name?: string;
  value?: string | null;
  value_id?: number | null;
}


