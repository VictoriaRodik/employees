import OrderList from "../components/orderComponents/OrderList";
import OrderItemList from "../components/orderItemComponents/OrderItemList";
import BaseTabbedPage from "./BaseTabbedPage";

const OrdersPage = () => {
  const tabs = [
    { label: "Накази", content: <OrderList /> },
    { label: "Елементи наказів", content: <OrderItemList /> },
  ];

  return (
    <BaseTabbedPage 
      title="Накази" 
      tabs={tabs} 
      ariaLabel="orders tabs"
    />
  );
};

export default OrdersPage;
