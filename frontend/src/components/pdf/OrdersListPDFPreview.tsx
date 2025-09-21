import React, { useEffect, useState, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import OrdersListPDF from "./OrdersListPDF";
import { OrderInterface } from "../../types/order";
import { Modal, Box, Button, CircularProgress } from "@mui/material";

interface OrdersListPDFPreviewProps {
  orders: OrderInterface[];
  filters?: {
    search?: string;
    startDate?: string;
    endDate?: string;
    sort?: string;
  };
  open: boolean;
  onClose: () => void;
}

const OrdersListPDFPreview: React.FC<OrdersListPDFPreviewProps> = ({
  orders,
  filters,
  open,
  onClose,
}) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (open) {
      const generatePdf = async () => {
        if (previousUrlRef.current) {
          URL.revokeObjectURL(previousUrlRef.current);
        }

        const blob = await pdf(<OrdersListPDF orders={orders} filters={filters} />).toBlob();
        const url = URL.createObjectURL(blob);
        previousUrlRef.current = url;
        setPdfUrl(url);
      };
      generatePdf();
    } else {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
        previousUrlRef.current = null;
      }
      setPdfUrl(null);
    }
  }, [open, orders, filters]);

  const getFileName = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    return `orders_list_${currentDate}.pdf`;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="orders-list-preview-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {pdfUrl ? (
          <>
            <iframe
              src={pdfUrl}
              style={{ flexGrow: 1, border: "none" }}
              title="Orders List PDF"
            />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={getFileName()}
            >
              Завантажити PDF
            </Button>
          </>
        ) : (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        )}
      </Box>
    </Modal>
  );
};

export default OrdersListPDFPreview;
