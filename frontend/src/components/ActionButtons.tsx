import { useState } from "react";
import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ConfirmDialog from "./ConfirmDialog";

interface ActionButtonsProps {
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
  editTitle?: string;
  copyTitle?: string;
  deleteTitle?: string;
}

const ActionButtons = ({
  onEdit,
  onCopy,
  onDelete,
  editTitle = "Edit",
  copyTitle = "Copy",
  deleteTitle = "Remove",
}: ActionButtonsProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenDialog(false);
    onDelete();
  };

  return (
    <>
      <IconButton title={editTitle} onClick={onEdit} color="primary">
        <EditOutlinedIcon />
      </IconButton>
      <IconButton title={copyTitle} onClick={onCopy} color="primary">
        <ContentCopyOutlinedIcon />
      </IconButton>
      <IconButton title={deleteTitle} onClick={handleDeleteClick} color="secondary">
        <DeleteOutlinedIcon />
      </IconButton>

      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmDelete}
        description="Ви дійсно бажаєте видалити цей запис?"
      />
    </>
  );
};

export default ActionButtons;
