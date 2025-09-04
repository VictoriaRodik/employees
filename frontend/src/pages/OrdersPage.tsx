import { useState } from "react";
import { Tabs, Tab, Box, Typography, Paper } from "@mui/material";
import OrderList from "../components/orderComponents/OrderList";
import OrderItemList from "../components/orderItemComponents/OrderItemList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`orders-tabpanel-${index}`}
      aria-labelledby={`orders-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const OrdersPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Накази
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="orders tabs">
            <Tab label="Накази" />
            <Tab label="Елементи наказів" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <OrderList />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <OrderItemList />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default OrdersPage;
