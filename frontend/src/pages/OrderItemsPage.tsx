import OrderTypeList from "../components/orderTypeComponents/OrderTypeList";
import { Typography, Box, Paper } from "@mui/material";

const OrderTypesPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary">
        Типи наказів
      </Typography>
      <Paper
        sx={{
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <OrderTypeList />
      </Paper>
    </Box>
  );
};

export default OrderTypesPage;
