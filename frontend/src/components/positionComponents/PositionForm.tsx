import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "../TextInput";
import { PositionInterface } from "../../types/position";
import { positionFormatted } from "../../utils/positionFormatted";

interface PositionFormProps {
  initialValues?: PositionInterface | null;
  onClose: () => void;
  onSubmit: (position: PositionInterface) => void;
}

const defaultValues: PositionInterface = {
  id: 0,
  positionName: "",
};

const PositionForm: React.FC<PositionFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const validationSchema = Yup.object({
    positionName: Yup.string().required("Обов'язкове поле"),
  });

  return (
    <Formik<PositionInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? positionFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="positionName" label="Назва" />
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

export default PositionForm;
