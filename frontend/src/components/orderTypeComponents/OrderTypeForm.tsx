import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button } from "@mui/material";
import TextInput from "../TextInput";
import { OrderTypeInterface } from "../../types/orderType";
import { orderTypeFormatted } from "../../utils/orderTypeFormatted";

interface orderTypeFormProps {
  initialValues?: OrderTypeInterface | null;
  onClose: () => void;
  onSubmit: (orderType: OrderTypeInterface) => void;
}

const defaultValues: OrderTypeInterface = {
  id: 0,
  orderTypeName: "",
};

const OrderTypeForm: React.FC<orderTypeFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const validationSchema = Yup.object({
    orderTypeName: Yup.string().required("Обов'язкове поле"),
  });

  return (
    <Formik<OrderTypeInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? orderTypeFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 12 }}>
              <TextInput name="orderTypeName" label="Назва" />
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

export default OrderTypeForm;
