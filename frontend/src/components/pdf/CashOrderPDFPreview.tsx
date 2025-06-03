import React, { useEffect, useState, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import CashOrderPDF from "./CashOrderPDF";
import { ContractInterface } from "../../types/contract";
import { Modal, Box, Button, CircularProgress } from "@mui/material";

interface CashOrderPDFPreviewProps {
  contract: ContractInterface;
  open: boolean;
  onClose: () => void;
}

const CashOrderPDFPreview: React.FC<CashOrderPDFPreviewProps> = ({
  contract,
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

        const blob = await pdf(<CashOrderPDF contract={contract} />).toBlob();
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
  }, [open, contract]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="cash-order-preview-modal"
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
              title="Cash Order PDF"
            />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="cash-order.pdf"
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

export default CashOrderPDFPreview;
