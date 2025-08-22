import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid2, Button, TextField, MenuItem } from "@mui/material";
import { OrderItemInterface } from "../../types/orderItem";
import { orderItemFormatted } from "../../utils/orderItemFormatted";
import { useOrders } from "../../hooks/useOrders";
import { useEmployees } from "../../hooks/useEmployees";
import { useFieldDefinitions } from "../../hooks/useFieldDefinitions";
import { EmployeeInterface } from "../../types/employee";
import { OrderInterface } from "../../types/order";
import { FieldDefinitionInterface } from "../../types/fieldDefinition";
import DynamicField from "../common/DynamicField";

interface orderItemFormProps {
  initialValues?: OrderItemInterface | null;
  onClose: () => void;
  onSubmit: (orderItem: OrderItemInterface) => void;
}

const defaultValues: OrderItemInterface = {
  id: 0,
  orderId: 0,
  employeeId: 0,
  fieldId: 0,
  value: "",
  valueId: 0,
  orderNumber: "",
  orderDate: "",
  employeeFullName: "",
  fieldDefinitionName: "",
};

const OrderItemForm: React.FC<orderItemFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const { data: orders = [] } = useOrders();
  const { data: employees = [] } = useEmployees();
  const { data: fieldDefinitions = [] } = useFieldDefinitions();

  const validationSchema = Yup.object({
    orderId: Yup.number().min(1, "Оберіть наказ").required("Обов'язкове поле"),
    employeeId: Yup.number().min(1, "Оберіть співробітника").required("Обов'язкове поле"),
    fieldId: Yup.number().min(1, "Оберіть поле").required("Обов'язкове поле"),
    value: Yup.string().required("Введіть значення"),
  });

  return (
    <Formik<OrderItemInterface>
      initialValues={{
        ...defaultValues,
        ...(initialValues ? orderItemFormatted(initialValues) : {}),
        
        orderId: initialValues?.orderId || 0,
        employeeId: initialValues?.employeeId || 0,
        fieldId: initialValues?.fieldId || 0,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, handleChange, errors, touched, setFieldValue }) => (
        <Form>
          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                select
                name="orderId"
                label="Наказ"
                value={orders.length > 0 && values.orderId > 0 ? values.orderId : ""}
                onChange={handleChange}
                fullWidth
                error={touched.orderId && Boolean(errors.orderId)}
                helperText={touched.orderId && errors.orderId}
              >
                <MenuItem value="">
                  <em>Оберіть наказ...</em>
                </MenuItem>
                {orders.map((order: OrderInterface) => (
                  <MenuItem key={order.id} value={order.id}>
                    {order.orderNumber} ({order.orderDate})
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>

            <Grid2 size={{ xs: 6 }}>
              <TextField
                select
                name="employeeId"
                label="Співробітник"
                value={employees.length > 0 && values.employeeId > 0 ? values.employeeId : ""}
                onChange={handleChange}
                fullWidth
                error={touched.employeeId && Boolean(errors.employeeId)}
                helperText={touched.employeeId && errors.employeeId}
              >
                <MenuItem value="">
                  <em>Оберіть співробітника...</em>
                </MenuItem>
                {employees.map((employee: EmployeeInterface) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.fullName} ({employee.personnelNumber})
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              <TextField
                select
                name="fieldId"
                label="Поле"
                value={fieldDefinitions.length > 0 && values.fieldId > 0 ? values.fieldId : ""}
                onChange={handleChange}
                fullWidth
                error={touched.fieldId && Boolean(errors.fieldId)}
                helperText={touched.fieldId && errors.fieldId}
              >
                <MenuItem value="">
                  <em>Оберіть поле...</em>
                </MenuItem>
                {fieldDefinitions.map(
                  (fieldDefinition: FieldDefinitionInterface) => (
                    <MenuItem
                      key={fieldDefinition.id}
                      value={fieldDefinition.id}
                    >
                      {fieldDefinition.fieldName}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 6 }}>
              {(() => {
                const selectedField = fieldDefinitions.find(
                  (field) => field.id === values.fieldId
                );
                if (selectedField) {
                  return (
                                         <DynamicField
                       fieldDefinition={selectedField}
                       value={values.value}
                       valueId={values.valueId}
                       onChange={(newValue, newValueId) => {
                         setFieldValue('value', newValue);
                         setFieldValue('valueId', newValueId);
                       }}
                       required
                       error={touched.value && Boolean(errors.value)}
                       helperText={touched.value && errors.value ? errors.value : undefined}
                     />
                  );
                }
                
                return (
                                     <TextField
                     name="value"
                     label="Значення"
                     value={values.value}
                     onChange={handleChange}
                     fullWidth
                     disabled={!values.fieldId || values.fieldId === 0}
                     placeholder="Спочатку оберіть поле"
                     error={touched.value && Boolean(errors.value)}
                     helperText={touched.value && errors.value}
                   />
                );
              })()}
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

export default OrderItemForm;
