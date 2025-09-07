import { EmployeeProfile, ApiEmployeeProfile, ApiOrderItem } from "../types/employeeProfile";


export const mapFromApiEmployeeProfile = (p: ApiEmployeeProfile): EmployeeProfile => {
  const mapAsOf = (src?: { as_of_order: { id: number; number: string; date: string } } | null) =>
    src?.as_of_order
      ? { id: src.as_of_order.id, number: src.as_of_order.number, date: src.as_of_order.date }
      : undefined as unknown as { id: number; number: string; date: string };

  return {
    employee: {
      id: p.employee.id,
      fullName: p.employee.full_name,
      taxId: p.employee.tax_id,
      address: p.employee.address,
      passportSeries: p.employee.passport_series ?? null,
      passportNumber: p.employee.passport_number,
      passportIssueDate: p.employee.passport_issue_date,
      passportIssuedBy: p.employee.passport_issued_by,
      personnelNumber: p.employee.personnel_number,
    },
    currentDepartment: p.current_department
      ? {
          id: p.current_department.id,
          name: p.current_department.name,
          asOfOrder: mapAsOf(p.current_department),
        }
      : null,
    currentPosition: p.current_position
      ? {
          id: p.current_position.id,
          name: p.current_position.name,
          asOfOrder: mapAsOf(p.current_position),
        }
      : null,
    currentEmploymentType: p.current_employment_type
      ? {
          id: p.current_employment_type.id,
          name: p.current_employment_type.name,
          asOfOrder: mapAsOf(p.current_employment_type),
        }
      : null,
    currentEmploymentCondition: p.current_employment_condition
      ? {
          id: p.current_employment_condition.id,
          name: p.current_employment_condition.name,
          asOfOrder: mapAsOf(p.current_employment_condition),
        }
      : null,
    currentWorkSchedule: p.current_work_schedule
      ? {
          id: p.current_work_schedule.id,
          name: p.current_work_schedule.name,
          asOfOrder: mapAsOf(p.current_work_schedule),
        }
      : null,
    currentQualification: p.current_qualification
      ? {
          id: p.current_qualification.id,
          grade: p.current_qualification.grade,
          asOfOrder: mapAsOf(p.current_qualification),
        }
      : null,
    currentGradeSalary: p.current_grade_salary
      ? {
          baseSalary: p.current_grade_salary.base_salary,
          effectiveFrom: p.current_grade_salary.effective_from,
          grade: p.current_grade_salary.grade,
        }
      : null,

    orderItems: ((p as unknown as { order_items?: ApiOrderItem[]; orderItems?: ApiOrderItem[] }).order_items
      ?? (p as unknown as { order_items?: ApiOrderItem[]; orderItems?: ApiOrderItem[] }).orderItems
      ?? []).map((oi) => ({
        id: oi.id,
        orderId: oi.order_id,
        orderNumber: oi.order_number,
        orderDate: oi.order_date,
        orderTypeName: oi.order_type_name,
        fieldDefinitionName: oi.field_definition_name,
        value: oi.value ?? null,
        valueId: oi.value_id ?? null,
      })),
  };
};