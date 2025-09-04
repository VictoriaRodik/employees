import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "../TextInput";
import { EmploymentConditionInterface } from "../../types/employmentCondition";
import { employmentConditionFormatted } from "../../utils/employmentConditionFormatted";

interface employmentConditionFormProps {
  initialValues?: EmploymentConditionInterface | null;
  onClose: () => void;
  onSubmit: (employmentCondition: EmploymentConditionInterface) => void;
}

const defaultValues: EmploymentConditionInterface = {
  id: 0,
  employmentConditionName: "",
};

const EmploymentConditionForm: React.FC<employmentConditionFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const validationSchema = Yup.object({
    employmentConditionName: Yup.string().required("Обов'язкове поле"),
  });

  return (
    <Formik<EmploymentConditionInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? employmentConditionFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="employmentConditionName" label="Назва" />
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

export default EmploymentConditionForm;
