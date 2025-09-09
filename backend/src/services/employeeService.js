import { EmployeeRepository } from '../repositories/employeeRepository.js';
import { ContractRepository } from '../repositories/contractRepository.js';
import { GradeSalaryRepository } from '../repositories/gradeSalaryRepository.js';
import { OrderItemRepository } from '../repositories/orderItemRepository.js';

const employeeRepository = new EmployeeRepository();
const contractRepository = new ContractRepository();
const gradeSalaryRepository = new GradeSalaryRepository();
const orderItemRepository = new OrderItemRepository();

export const getAllEmployees = async () => {
  return await employeeRepository.getAll();
};

export const getEmployeeById = async (id) => {
  const employee = await employeeRepository.getById(id);
  if (!employee) throw new Error('Employee not found');
  return employee;
};

export const createEmployee = async (data) => {
  return await employeeRepository.create(data);
};

export const updateEmployee = async (id, data) => {
  return await employeeRepository.update(id, data);
};

export const deleteEmployee = async (id) => {
  return await employeeRepository.delete(id);
};

export const getEmployeeProfile = async (id) => {
  const employee = await employeeRepository.getById(id);
  if (!employee) throw new Error('Employee not found');

  const [contracts, orderItems, latestGradeRef, latestDepartmentRef, latestPositionRef, latestEmploymentTypeRef, latestEmploymentConditionRef, latestWorkScheduleRef] = await Promise.all([
    contractRepository.getByEmployeeId(id),
    orderItemRepository.getByEmployeeId(id),
    orderItemRepository.getLatestQualificationGradeByEmployeeId(id),
    orderItemRepository.getLatestReferenceByEmployeeIdAndTable(id, 'departments'),
    orderItemRepository.getLatestReferenceByEmployeeIdAndTable(id, 'positions'),
    orderItemRepository.getLatestReferenceByEmployeeIdAndTable(id, 'employment_types'),
    orderItemRepository.getLatestReferenceByEmployeeIdAndTable(id, 'employment_conditions'),
    orderItemRepository.getLatestReferenceByEmployeeIdAndTable(id, 'work_schedules'),
  ]);

  const latestContract = contracts?.[0] || null;

  let currentQualification = null;
  let currentGradeSalary = null;
  if (latestGradeRef?.qualification_grade_id) {
    currentQualification = {
      id: latestGradeRef.qualification_grade_id,
      grade: latestGradeRef.qualification_grade,
      asOfOrder: {
        id: latestGradeRef.order_id,
        number: latestGradeRef.order_number,
        date: latestGradeRef.order_date,
      },
    };
    currentGradeSalary = await gradeSalaryRepository.getLatestByGradeId(
      latestGradeRef.qualification_grade_id
    );
  }


  return {
    employee,
    latest_contract: latestContract,
    contracts,
    order_items: orderItems,
    current_qualification: currentQualification
      ? {
          id: currentQualification.id,
          grade: currentQualification.grade,
          as_of_order: currentQualification.asOfOrder,
        }
      : null,
    current_grade_salary: currentGradeSalary
      ? {
          base_salary: currentGradeSalary.base_salary ?? currentGradeSalary.baseSalary,
          effective_from: currentGradeSalary.effective_from ?? currentGradeSalary.effectiveFrom,
          grade: currentGradeSalary.grade,
        }
      : null,
    current_department: latestDepartmentRef
      ? {
          id: latestDepartmentRef.reference_id,
          name: latestDepartmentRef.reference_name,
          as_of_order: {
            id: latestDepartmentRef.order_id,
            number: latestDepartmentRef.order_number,
            date: latestDepartmentRef.order_date,
          },
        }
      : null,
    current_position: latestPositionRef
      ? {
          id: latestPositionRef.reference_id,
          name: latestPositionRef.reference_name,
          as_of_order: {
            id: latestPositionRef.order_id,
            number: latestPositionRef.order_number,
            date: latestPositionRef.order_date,
          },
        }
      : null,
    current_employment_type: latestEmploymentTypeRef
      ? {
          id: latestEmploymentTypeRef.reference_id,
          name: latestEmploymentTypeRef.reference_name,
          as_of_order: {
            id: latestEmploymentTypeRef.order_id,
            number: latestEmploymentTypeRef.order_number,
            date: latestEmploymentTypeRef.order_date,
          },
        }
      : null,
    current_employment_condition: latestEmploymentConditionRef
      ? {
          id: latestEmploymentConditionRef.reference_id,
          name: latestEmploymentConditionRef.reference_name,
          as_of_order: {
            id: latestEmploymentConditionRef.order_id,
            number: latestEmploymentConditionRef.order_number,
            date: latestEmploymentConditionRef.order_date,
          },
        }
      : null,
    current_work_schedule: latestWorkScheduleRef
      ? {
          id: latestWorkScheduleRef.reference_id,
          name: latestWorkScheduleRef.reference_name,
          as_of_order: {
            id: latestWorkScheduleRef.order_id,
            number: latestWorkScheduleRef.order_number,
            date: latestWorkScheduleRef.order_date,
          },
        }
      : null,
  };
};
