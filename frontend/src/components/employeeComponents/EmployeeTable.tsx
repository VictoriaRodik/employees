import React, { useState } from "react";
import GeneralTable from "../Table";
import Actions from "../Actions";
import { EmployeeInterface } from "../../types/employee";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { IconButton, Tooltip } from "@mui/material";
import EmployeeProfilePDFPreview from "../pdf/EmployeeProfilePDFPreview";
import { useEmployeeProfile } from "../../hooks/useEmployeeProfile";

interface EmployeeTableProps {
  employees: EmployeeInterface[];
  onEdit: (employee: EmployeeInterface) => void;
  onCopy: (employee: EmployeeInterface) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onCopy,
  onDelete,
}) => {
  const columns = [
    { key: "fullName" as keyof EmployeeInterface, label: "ПІБ" },
    {
      key: "personnelNumber" as keyof EmployeeInterface,
      label: "Табельний номер",
    },
    { key: "taxId" as keyof EmployeeInterface, label: "ІПН" },
  ];

  const [openId, setOpenId] = useState<number | null>(null);
  const { data: profileData } = useEmployeeProfile(openId ?? undefined);

  return (
    <>
      <GeneralTable<EmployeeInterface>
        data={employees}
        columns={columns}
        renderActions={(employee) => (
          <Actions
            onEdit={() => onEdit(employee)}
            onCopy={() => onCopy(employee)}
            onDelete={() => onDelete(employee.id)}
            editTitle="Edit"
            copyTitle="Copy"
            deleteTitle="Delete"
          />
        )}
        renderExtraActions={(employee: EmployeeInterface) => (
          <Tooltip title="Експорт профілю в PDF">
            <IconButton onClick={() => setOpenId(employee.id)} color="primary">
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        )}
      />

      <EmployeeProfilePDFPreview
        data={profileData}
        open={openId !== null}
        onClose={() => setOpenId(null)}
      />
    </>
  );
};

export default EmployeeTable;
