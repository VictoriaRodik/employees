import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import JSZip from "jszip";
import { pdf } from "@react-pdf/renderer";
import EmployeeProfilePDF, { type EmployeeProfileData } from "../pdf/EmployeeProfilePDF";
import type { EmployeeInterface } from "../../types/employee";

interface ExportProfilesButtonProps {
  employees: EmployeeInterface[];
}

const ExportProfilesButton = ({ employees }: ExportProfilesButtonProps) => {
  const [exporting, setExporting] = useState<boolean>(false);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const handleExportAll = async () => {
    setExporting(true);
    try {
      const zip = new JSZip();
      for (const emp of employees) {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/employees/${emp.id}/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }
        );
        if (!res.ok) continue;
        const profile: EmployeeProfileData = await res.json();
        const blob = await pdf(
          <EmployeeProfilePDF
            data={{
              ...profile,
              orderItems: (profile.orderItems || []).filter(
                (oi) => new Date(oi.order_date).getFullYear() === year
              ),
            }}
          />
        ).toBlob();
        const arrBuf = await blob.arrayBuffer();
        const safeName = (
          emp.fullName || `employee-${emp.id}`
        ).replace(/[^\p{L}\p{N}_\- ]/gu, "_");
        zip.file(`${safeName}-${year}.pdf`, arrBuf);
      }
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `employees-${year}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Рік"
        type="number"
        value={year}
        onChange={(e) => setYear(Number(e.target.value) || new Date().getFullYear())}
        size="small"
        sx={{ width: 140 }}
      />
      <Button
        variant="contained"
        onClick={handleExportAll}
        disabled={exporting || employees.length === 0}
      >
        {exporting ? "Експорт триває..." : "Експорт профілів за рік (ZIP)"}
      </Button>
    </Stack>
  );
};

export default ExportProfilesButton;


