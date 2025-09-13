import OrderItemList from "../components/orderItemComponents/OrderItemList";
import BasePage from "./BasePage";

const OrderItemsPage = () => {
  return (
    <BasePage title="Елементи наказів">
      <OrderItemList />
    </BasePage>
  );
};

export default OrderItemsPage;
