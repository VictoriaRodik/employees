import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

interface ActionsProps {
  onEdit: () => void;
  onCopy: () => void;
  onDelete: () => void;
  editTitle?: string;
  copyTitle?: string;
  deleteTitle?: string;
}

const Actions = ({
  onEdit,
  onCopy,
  onDelete,
  editTitle = "Edit",
  copyTitle = "Copy",
  deleteTitle = "Remove",
}: ActionsProps) => {
  return (
    <>
      <IconButton title={editTitle} onClick={onEdit} color="primary">
        <EditOutlinedIcon />
      </IconButton>
      <IconButton title={copyTitle} onClick={onCopy} color="primary">
        <ContentCopyOutlinedIcon />
      </IconButton>
      <IconButton title={deleteTitle} onClick={onDelete} color="secondary">
        <DeleteOutlinedIcon />
      </IconButton>
    </>
  );
};

export default Actions;