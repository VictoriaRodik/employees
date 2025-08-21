import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button, TextField, MenuItem } from "@mui/material";
import TextInput from "../TextInput";
import { FieldDefinitionInterface } from "../../types/fieldDefinition";
import { fieldDefinitionFormatted } from "../../utils/fieldDefinitionFormatted";
import { ReferenceSourceInterface } from "../../types/referenceSource";
import { useReferenceSources } from "../../hooks/useReferenceSources";

interface fieldDefinitionFormProps {
  initialValues?: FieldDefinitionInterface | null;
  onClose: () => void;
  onSubmit: (fieldDefinition: FieldDefinitionInterface) => void;
}

const defaultValues: FieldDefinitionInterface = {
  id: 0,
  fieldName: "",
  fieldType: "",
  orderIndex: 0,
  referenceSourceId: 0,
  referenceSourceName: "",
};

const FieldDefinitionForm: React.FC<fieldDefinitionFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const { data: referenceSources = [] } = useReferenceSources();

  const validationSchema = Yup.object({
    fieldName: Yup.string().required("Обов'язкове поле"),
    fieldType: Yup.string().required("Обов'язкове поле"),
    orderIndex: Yup.number(),
    referenceSourceId: Yup.number(),
  });

  return (
    <Formik<FieldDefinitionInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? fieldDefinitionFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="fieldName" label="Назва" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="fieldType" label="Тип" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="orderIndex" label="Індекс" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                select
                name="referenceSourceId"
                label="Посилання на таблицю"
                value={
                  referenceSources.length > 0 ? values.referenceSourceId : ""
                }
                onChange={handleChange}
                fullWidth
              >
                {referenceSources.map((ref: ReferenceSourceInterface) => (
                  <MenuItem key={ref.id} value={ref.id}>
                    {ref.tableName}
                  </MenuItem>
                ))}
              </TextField>
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

export default FieldDefinitionForm;
