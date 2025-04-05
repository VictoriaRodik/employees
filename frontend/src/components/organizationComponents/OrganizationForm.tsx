import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "../TextInput";
import { OrganizationInterface } from "../../types/organization";
import { organizationFormatted } from "../../utils/organizationFormatted";

interface OrganizationFormProps {
  initialValues?: OrganizationInterface | null;
  onClose: () => void;
  onSubmit: (organization: OrganizationInterface) => void;
}

const defaultValues: OrganizationInterface = {
  id: 0,
  name: "",
  shortName: "",
  edrpouCode: "",
  address: "",
  phone: "",
  bankAccount: "",
  bankName: "",
  foundationDoc: "",
  directorPosition: "",
  directorFullName: "",
};

const OrganizationForm: React.FC<OrganizationFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Обов'язкове поле"),
    shortName: Yup.string().required("Обов'язкове поле"),
    edrpouCode: Yup.string()
      .matches(/^\d{8}$/, "Має бути 8 цифр")
      .required("Обов'язкове поле"),
    address: Yup.string().required("Обов'язкове поле"),
    phone: Yup.string(),
    bankAccount: Yup.string(),
    bankName: Yup.string(),
    foundationDoc: Yup.string().required("Обов'язкове поле"),
    directorPosition: Yup.string().required("Обов'язкове поле"),
    directorFullName: Yup.string().required("Обов'язкове поле"),
  });

  return (
    <Formik<OrganizationInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? organizationFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="name" label="Назва організації" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="shortName" label="Скорочена назва" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="edrpouCode" label="ЄДРПОУ" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="address" label="Адреса" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="phone" label="Телефон" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="bankAccount" label="Розрахунковий рахунок" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="bankName" label="Банк" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="foundationDoc" label="Установчий документ" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="directorPosition" label="Посада керівника" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="directorFullName" label="ПІБ керівника" />
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

export default OrganizationForm;
