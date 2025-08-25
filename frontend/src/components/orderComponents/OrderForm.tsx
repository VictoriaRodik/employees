import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button, TextField, MenuItem } from "@mui/material";
import TextInput from "../TextInput";
import { OrderInterface } from "../../types/order";
import { orderFormatted } from "../../utils/orderFormatted";
import { OrderTypeInterface } from "../../types/orderType";
import { useOrderTypes } from "../../hooks/useOrderTypes";

interface orderFormProps {
  initialValues?: OrderInterface | null;
  onClose: () => void;
  onSubmit: (order: OrderInterface) => void;
}

const defaultValues: OrderInterface = {
  id: 0,
  orderNumber: "",
  orderDate: new Date().toLocaleDateString("en-CA"),
  orderTypeId: 0,
  orderTypeName: "",
};

const OrderForm: React.FC<orderFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const { data: orderTypes = [] } = useOrderTypes();

  const validationSchema = Yup.object({
    orderNumber: Yup.string().required("Обов'язкове поле"),
    orderDate: Yup.date().required("Обов'язкове поле"),
    orderTypeId: Yup.number().required("Обов'язкове поле"),
  });

  return (
    <Formik<OrderInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? orderFormatted(initialValues) : {}),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="orderNumber" label="Номер" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="orderDate" label="Дата" type="date" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextInput name="orderIndex" label="Індекс" />
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                select
                name="orderTypeId"
                label="Тип"
                value={
                  orderTypes.length > 0 ? values.orderTypeId : ""
                }
                onChange={handleChange}
                fullWidth
              >
                {orderTypes.map((orderType: OrderTypeInterface) => (
                  <MenuItem key={orderType.id} value={orderType.id}>
                    {orderType.orderTypeName}
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

export default OrderForm;
