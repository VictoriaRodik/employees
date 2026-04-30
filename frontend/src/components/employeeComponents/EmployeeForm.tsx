import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "../TextInput";
import { EmployeeInterface } from "../../types/employee";
import { employeeFormatted } from "../../utils/employeeFormatted";

interface EmployeeFormProps {
  initialValues?: EmployeeInterface | null;
  onClose: () => void;
  onSubmit: (employee: EmployeeInterface) => void;
}

const defaultValues: EmployeeInterface = {
  id: 0,
  taxId: "",
  fullName: "",
  address: "",
  passportSeries: "",
  passportNumber: "",
  passportIssueDate: new Date().toLocaleDateString("en-CA"),
  passportIssuedBy: "",
  personnelNumber: "",
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  onSubmit
}) => {

  const validationSchema = Yup.object({
    taxId: Yup.string()
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
    initialValues={{
      ...defaultValues,
      ...(initialValues ? employeeFormatted(initialValues) : {}),
    }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="personnelNumber" label="Табельний номер" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="taxId" label="Податковий номер" />
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
                type="date"
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
