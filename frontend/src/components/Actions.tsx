import {
  IconButton,
  useMediaQuery,
  Dialog,
  DialogActions,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ActionButtons from "./ActionButtons";

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
  editTitle,
  copyTitle,
  deleteTitle,
}: ActionsProps) => {
  const muiTheme = useMuiTheme();
  const isSmUp = useMediaQuery(muiTheme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);

  const onDialogOpen = () => setOpen(true);
  const onDialogClose = () => setOpen(false);

  const buttons = (
    <ActionButtons
      onEdit={onEdit}
      onCopy={onCopy}
      onDelete={onDelete}
      editTitle={editTitle}
      copyTitle={copyTitle}
      deleteTitle={deleteTitle}
    />
  );

  if (isSmUp) return <>{buttons}</>;

  return (
    <>
      <IconButton onClick={onDialogOpen}>
        <MoreHorizIcon />
      </IconButton>

      <Dialog open={open} onClose={onDialogClose} maxWidth="xs" sx={{justifySelf: "flex-end"}}>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          {buttons}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
