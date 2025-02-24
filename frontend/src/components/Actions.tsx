import { IconButton } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


interface ActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const Actions = ({ onEdit, onDelete }: ActionsProps) => {
  return (
    <>
      <IconButton title="Edit" onClick={onEdit} color="primary">
        <EditOutlinedIcon />
      </IconButton>
      <IconButton onClick={onDelete} color="secondary">
        <DeleteOutlinedIcon />
      </IconButton>

    </>
  );
};

export default Actions;
