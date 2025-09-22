import React, { useState } from "react";
import { Button, Tooltip } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { OrderInterface } from "../../types/order";
import OrdersListPDFPreview from "../pdf/OrdersListPDFPreview";

interface ExportOrdersButtonProps {
  orders: OrderInterface[];
  filters?: {
    search?: string;
    startDate?: string;
    endDate?: string;
    sort?: string;
  };
}

const ExportOrdersButton: React.FC<ExportOrdersButtonProps> = ({
  orders,
  filters,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  return (
    <>
      <Tooltip title="Попередній перегляд та друк списку наказів">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handlePreview}
          fullWidth
          sx={{
            width: "fit-content",
            alignSelf: "center",
          }}
        >
          <PictureAsPdfIcon />Список
        </Button>
      </Tooltip>

      <OrdersListPDFPreview
        orders={orders}
        filters={filters}
        open={previewOpen}
        onClose={handleClosePreview}
      />
    </>
  );
};

export default ExportOrdersButton;
