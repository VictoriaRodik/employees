import OrderTypeList from "../components/orderTypeComponents/OrderTypeList";
import BasePage from "./BasePage";

const OrderTypesPage = () => {
  return (
    <BasePage title="Типи наказів">
      <OrderTypeList />
    </BasePage>
  );
};

export default OrderTypesPage;
