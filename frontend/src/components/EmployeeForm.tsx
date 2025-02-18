import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "./TextInput";
import { EmployeeInterface } from "../types/employee";
import { useEmployees } from "../hooks/useEmployees";

interface EmployeeFormProps {
  initialValues?: EmployeeInterface | null;
  onClose: () => void;
  onSubmit: (employee: EmployeeInterface) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  onClose,
}) => {
  const { createEmployee, updateEmployee } = useEmployees();

  const validationSchema = Yup.object({
    taxNumber: Yup.string()
      .matches(/^\d{10}$/, "Має бути 10 цифр")
      .required("Обов'язкове поле"),
    fullName: Yup.string().required("Обов'язкове поле"),
    passportSeries: Yup.string().matches(
      /^[А-ЯІЄҐA-Z]{2}$/,
      "Має бути 2 літери"
    ),
    passportNumber: Yup.string()
      .matches(/^\d+$/, "Має містити лише цифри")
      .required("Обов'язкове поле"),
    passportIssueDate: Yup.date().required("Обов'язкове поле"),
    passportIssuedBy: Yup.string().required("Обов'язкове поле"),
    personnelNumber: Yup.string().matches(/^\d+$/, "Має містити лише цифри"),
  });

  return (
    <Formik<EmployeeInterface>
      initialValues={
        initialValues || {
          id: 0,
          taxNumber: "",
          fullName: "",
          address: "",
          passportSeries: "",
          passportNumber: "",
          passportIssueDate: "",
          passportIssuedBy: "",
          personnelNumber: "",
        }
      }
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (values.id) {
          await updateEmployee.mutateAsync(values);
        } else {
          await createEmployee.mutateAsync(values);
        }
        onClose();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="personnelNumber" label="Табельний номер" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="taxNumber" label="Податковий номер" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="fullName" label="ПІБ" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="address" label="Адреса" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="passportSeries" label="Серія паспорта" />
            </Grid2>

            <Grid2 size={{ xs: 6 }}>
              <TextInput
                name="passportNumber"
                label="Номер паспорта або ID-картки"
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput
                name="passportIssueDate"
                label="Дата видачі паспорта або ID-картки"
              />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput
                name="passportIssuedBy"
                label="Орган видачі паспорта або ID-картки"
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

export default EmployeeForm;
