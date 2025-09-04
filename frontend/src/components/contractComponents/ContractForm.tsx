import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button, MenuItem, TextField } from "@mui/material";
import TextInput from "../TextInput";
import { ContractInterface } from "../../types/contract";
import { useEmployees } from "../../hooks/useEmployees";
import { contractFormatted } from "../../utils/contractFormatted";
import { EmployeeInterface } from "../../types/employee";
import { OrganizationInterface } from "../../types/organization";
import { useOrganizations } from "../../hooks/useOrganizations";
interface ContractFormProps {
  initialValues?: ContractInterface | null;
  onClose: () => void;
  onSubmit: (contract: ContractInterface) => void;
}

const defaultValues: ContractInterface = {
  id: 0,
  employeeId: "",
  contractDate: new Date().toLocaleDateString("en-CA"),
  contractEndDate: new Date().toLocaleDateString("en-CA"),
  contractAmount: "",
  contractContent: "",
  contractNumber: "",
  taxId: "",
  fullName: "",
  passportSeries: "",
  passportNumber: "",
  passportIssueDate: new Date().toLocaleDateString("en-CA"),
  passportIssuedBy: "",
  organizationId: "",
  name: "",
  shortName: "",
  edrpouCode: "",
  legalAddress: "",
  phone: "",
  bankAccount: "",
  bankName: "",
  foundationDoc: "",
  directorPosition: "",
  directorFullName: "",
};

const ContractForm: React.FC<ContractFormProps> = ({
  initialValues,
  onSubmit
}) => {
  const { data: employees = [] } = useEmployees();
  const { data: organizations = [] } = useOrganizations();

  const validationSchema = Yup.object({
    employeeId: Yup.number().required("Обов'язкове поле"),
    organizationId: Yup.number().required("Обов'язкове поле"),
    contractDate: Yup.date().required("Обов'язкове поле"),
    contractEndDate: Yup.date().required("Обов'язкове поле"),
    contractAmount: Yup.string()
      .matches(/^\d+(\.\d{1,2})?$/, "Некоректна сума")
      .required("Обов'язкове поле"),
    contractContent: Yup.string().required("Обов'язкове поле"),
    contractNumber: Yup.string().required("Обов'язкове поле"),
  });

  return (
    <Formik<ContractInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? contractFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
          <Grid2 size={{ xs: 6 }}>
              <TextField
                select
                name="organizationId"
                label="Замовник"
                value={organizations.length > 0 ? values.organizationId : ""}
                onChange={handleChange}
                fullWidth
              >
                {organizations.map((org: OrganizationInterface) => (
                  <MenuItem key={org.id} value={org.id}>
                    {org.shortName} ({org.edrpouCode})
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                select
                name="employeeId"
                label="Співробітник"
                value={employees.length > 0 ? values.employeeId : ""}
                onChange={handleChange}
                fullWidth
              >
                {employees.map((employee: EmployeeInterface) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.fullName} ({employee.personnelNumber})
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput
                name="contractDate"
                type="date"
                label="Дата контракту"
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput
                name="contractEndDate"
                type="date"
                label="Дата закінчення контракту"
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="contractAmount" label="Сума контракту" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="contractNumber" label="Номер контракту" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput
                name="contractContent"
                label="Зміст контракту"
                multiline
                rows={3}
              />
            </Grid2>
          </Grid2>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {initialValues ? "Зберегти зміни" : "Додати"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContractForm;
