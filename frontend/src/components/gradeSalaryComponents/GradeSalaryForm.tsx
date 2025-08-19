import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button, TextField, MenuItem } from "@mui/material";
import TextInput from "../TextInput";
import { GradeSalaryInterface } from "../../types/gradeSalary";
import { gradeSalaryFormatted } from "../../utils/gradeSalaryFormatted";
import { useQualificationGrades } from "../../hooks/useQualificationGrades";
import { QualificationGradeInterface } from "../../types/qualificationGrade";

interface gradeSalaryFormProps {
  initialValues?: GradeSalaryInterface | null;
  onClose: () => void;
  onSubmit: (gradeSalary: GradeSalaryInterface) => void;
}

const defaultValues: GradeSalaryInterface = {
  id: 0,
  gradeId: 0,
  baseSalary: 0,
  effectiveFrom: "",
};

const GradeSalaryForm: React.FC<gradeSalaryFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const { data: grades = [] } = useQualificationGrades();
  const validationSchema = Yup.object({
    gradeId: Yup.number().required("Обов'язкове поле"),
    baseSalary: Yup.string()
      .matches(/^\d+(\.\d{1,2})?$/, "Некоректна сума")
      .required("Обов'язкове поле"),
    effectiveFrom: Yup.date().required("Обов'язкове поле"),
  });

  return (
    <Formik<GradeSalaryInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? gradeSalaryFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                select
                name="gradeId"
                label="Розряд"
                value={values.gradeId}
                onChange={handleChange}
                fullWidth
              >
                {grades.map((grade: QualificationGradeInterface) => (
                  <MenuItem key={grade.id} value={grade.id}>
                    {grade.grade}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="baseSalary" label="Базова зарплата" />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="effectiveFrom" label="Діє з" type="date" />
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

export default GradeSalaryForm;
