import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { fetchEmployeeProfile } from "../api/employees";
import { type EmployeeProfile, type ApiEmployeeProfile } from "../types/employeeProfile";
import { mapFromApiEmployeeProfile } from "../utils/employeeProfileMapper";

export const useEmployeeProfile = (
  id: number | undefined
): UseQueryResult<EmployeeProfile, unknown> => {
  return useQuery<EmployeeProfile>({
    queryKey: ["employeeProfile", id],
    enabled: !!id,
    queryFn: async () => {
      const raw = await fetchEmployeeProfile<ApiEmployeeProfile>(id as number);
      return mapFromApiEmployeeProfile(raw);
    },
  });
};
