import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "../TextInput";
import { EmploymentTypeInterface } from "../../types/employmentType";
import { employmentTypeFormatted } from "../../utils/employmentTypeFormatted";

interface employmentTypeFormProps {
  initialValues?: EmploymentTypeInterface | null;
  onClose: () => void;
  onSubmit: (employmentType: EmploymentTypeInterface) => void;
}

const defaultValues: EmploymentTypeInterface = {
  id: 0,
  employmentTypeName: "",
};

const EmploymentTypeForm: React.FC<employmentTypeFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const validationSchema = Yup.object({
    employmentTypeName: Yup.string().required("Обов'язкове поле"),
  });

  return (
    <Formik<EmploymentTypeInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? employmentTypeFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="employmentTypeName" label="Назва" />
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

export default EmploymentTypeForm;
