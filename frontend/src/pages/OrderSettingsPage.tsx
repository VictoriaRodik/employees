import OrderTypeList from "../components/orderTypeComponents/OrderTypeList";
import FieldDefinitionList from "../components/fieldDefinitionComponents/FieldDefinitionList";
import ReferenceSourceList from "../components/referenceSourceComponents/ReferenceSourceList";
import BaseTabbedPage from "./BaseTabbedPage";

const OrderSettingsPage = () => {
  const tabs = [
    { label: "Типи наказів", content: <OrderTypeList /> },
    { label: "Типи полів", content: <FieldDefinitionList /> },
    { label: "Джерела довідників", content: <ReferenceSourceList /> },
  ];

  return (
    <BaseTabbedPage 
      title="Налаштування наказів" 
      tabs={tabs} 
      ariaLabel="order settings tabs"
    />
  );
};

export default OrderSettingsPage;
