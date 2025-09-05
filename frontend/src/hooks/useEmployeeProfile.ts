import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchEmployeeProfile } from "../api/employees";
import type { EmployeeProfileData } from "../components/pdf/EmployeeProfilePDF";

export const useEmployeeProfile = (
  id: number | undefined
): UseQueryResult<EmployeeProfileData, unknown> => {
  return useQuery<EmployeeProfileData>({
    queryKey: ["employeeProfile", id],
    queryFn: () => fetchEmployeeProfile<EmployeeProfileData>(id as number),
    enabled: !!id,
  });
};


