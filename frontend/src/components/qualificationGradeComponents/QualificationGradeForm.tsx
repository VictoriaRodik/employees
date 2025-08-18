import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "../TextInput";
import { QualificationGradeInterface } from "../../types/qualificationGrade";
import { qualificationGradeFormatted } from "../../utils/qualificationGradeFormatted";

interface qualificationGradeFormProps {
  initialValues?: QualificationGradeInterface | null;
  onClose: () => void;
  onSubmit: (qualificationGrade: QualificationGradeInterface) => void;
}

const defaultValues: QualificationGradeInterface = {
  id: 0,
  grade: 0,
};

const QualificationGradeForm: React.FC<qualificationGradeFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const validationSchema = Yup.object({
    grade: Yup.number().required("Обов'язкове поле"),
  });

  return (
    <Formik<QualificationGradeInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? qualificationGradeFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="grade" label="Назва" />
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

export default QualificationGradeForm;
