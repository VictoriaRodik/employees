import React, { useEffect, useRef, useState } from "react";
import { Modal, Box, Button, CircularProgress, TextField, Stack } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import EmployeeProfilePDF from "./EmployeeProfilePDF";
import type { EmployeeProfile } from "../../types/employeeProfile";

interface EmployeeProfilePDFPreviewProps {
  data: EmployeeProfile | undefined;
  open: boolean;
  onClose: () => void;
}

const EmployeeProfilePDFPreview: React.FC<EmployeeProfilePDFPreviewProps> = ({ data, open, onClose }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (open && data) {
      const generatePdf = async () => {
        if (previousUrlRef.current) {
          URL.revokeObjectURL(previousUrlRef.current);
        }
        const blob = await pdf(<EmployeeProfilePDF data={data} year={year} />).toBlob();
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
  }, [open, data, year]);

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="employee-profile-preview-modal">
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", height: "90%", bgcolor: "background.paper", boxShadow: 24, p: 2, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <TextField
            label="Рік"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value) || new Date().getFullYear())}
            size="small"
            sx={{ width: 140 }}
          />
        </Stack>
        {pdfUrl ? (
          <>
            <iframe src={pdfUrl} style={{ flexGrow: 1, border: "none" }} title="Employee Profile PDF" />
            <Button variant="contained" sx={{ mt: 2 }} href={pdfUrl} target="_blank" rel="noopener noreferrer" download={`employee-${data?.employee?.id || "profile"}-${year}.pdf`}>
              Завантажити PDF
            </Button>
          </>
        ) : (
          <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
        )}
      </Box>
    </Modal>
  );
};

export default EmployeeProfilePDFPreview;



