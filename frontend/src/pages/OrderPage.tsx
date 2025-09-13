import OrderList from "../components/orderComponents/OrderList";
import BasePage from "./BasePage";

const OrdersPage = () => {
  return (
    <BasePage title="Накази">
      <OrderList />
    </BasePage>
  );
};

export default OrdersPage;
