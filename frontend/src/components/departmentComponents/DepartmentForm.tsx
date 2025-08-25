import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "../TextInput";
import { DepartmentInterface } from "../../types/department";
import { departmentFormatted } from "../../utils/departmentFormatted";

interface DepartmentFormProps {
  initialValues?: DepartmentInterface | null;
  onClose: () => void;
  onSubmit: (department: DepartmentInterface) => void;
}

const defaultValues: DepartmentInterface = {
  id: 0,
  departmentName: "",
};

const DepartmentForm: React.FC<DepartmentFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const validationSchema = Yup.object({
    departmentName: Yup.string().required("Обов'язкове поле"),
  });

  return (
    <Formik<DepartmentInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? departmentFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="departmentName" label="Назва" />
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

export default DepartmentForm;
