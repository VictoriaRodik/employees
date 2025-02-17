import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "./TextInput";
import { EmployeeInterface } from "../types/employee";
import { useAddEmployee } from "../hooks/useEmployees";

const EmployeeForm: React.FC = () => {
  const addEmployee = useAddEmployee();

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
      initialValues={{
        id: 0,
        taxNumber: "",
        fullName: "",
        address: "",
        passportSeries: "",
        passportNumber: "",
        passportIssueDate: "",
        passportIssuedBy: "",
        personnelNumber: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        addEmployee.mutate(values);
        resetForm();
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
            Додати працівника
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
