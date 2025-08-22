import OrderList from "../components/orderComponents/OrderList";
import { Typography, Box, Paper } from "@mui/material";

const OrdersPage = () => {
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
        <OrderList />
      </Paper>
    </Box>
  );
};

export default OrdersPage;
