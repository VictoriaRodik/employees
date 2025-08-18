import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "../TextInput";
import { WorkScheduleInterface } from "../../types/workSchedule";
import { workScheduleFormatted } from "../../utils/workScheduleFormatted";

interface workScheduleFormProps {
  initialValues?: WorkScheduleInterface | null;
  onClose: () => void;
  onSubmit: (workSchedule: WorkScheduleInterface) => void;
}

const defaultValues: WorkScheduleInterface = {
  id: 0,
  workScheduleName: "",
  hoursPerWeek: 40,
};

const WorkScheduleForm: React.FC<workScheduleFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const validationSchema = Yup.object({
    workScheduleName: Yup.string().required("Обов'язкове поле"),
  });

  return (
    <Formik<WorkScheduleInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? workScheduleFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="workScheduleName" label="Назва" />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="hoursPerWeek" label="Кількість годин на тиждень" />
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

export default WorkScheduleForm;
