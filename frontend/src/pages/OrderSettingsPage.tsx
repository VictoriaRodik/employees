import { useState } from "react";
import { Tabs, Tab, Box, Typography, Paper } from "@mui/material";
import OrderTypeList from "../components/orderTypeComponents/OrderTypeList";
import FieldDefinitionList from "../components/fieldDefinitionComponents/FieldDefinitionList";
import ReferenceSourceList from "../components/referenceSourceComponents/ReferenceSourceList";

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
      id={`order-settings-tabpanel-${index}`}
      aria-labelledby={`order-settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const OrderSettingsPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Налаштування наказів
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="order settings tabs">
            <Tab label="Типи наказів" />
            <Tab label="Типи полів" />
            <Tab label="Джерела довідників" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <OrderTypeList />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <FieldDefinitionList />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ReferenceSourceList />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default OrderSettingsPage;
