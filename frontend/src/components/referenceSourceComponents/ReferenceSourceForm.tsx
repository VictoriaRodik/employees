import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "../TextInput";
import { ReferenceSourceInterface } from "../../types/referenceSource";
import { referenceSourceFormatted } from "../../utils/referenceSourceFormatted";

interface referenceSourceFormProps {
  initialValues?: ReferenceSourceInterface | null;
  onClose: () => void;
  onSubmit: (referenceSource: ReferenceSourceInterface) => void;
}

const defaultValues: ReferenceSourceInterface = {
  id: 0,
  tableName: "",
};

const ReferenceSourceForm: React.FC<referenceSourceFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const validationSchema = Yup.object({
    tableName: Yup.string().required("Обов'язкове поле"),
  });

  return (
    <Formik<ReferenceSourceInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? referenceSourceFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="tableName" label="Назва" />
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

export default ReferenceSourceForm;
