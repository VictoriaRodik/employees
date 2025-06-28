import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  description = "Ви дійсно бажаєте видалити цей запис? Цю дію не можна буде скасувати.",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} autoFocus color="error">
          Так
        </Button>
        <Button onClick={onClose}>Ні</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
