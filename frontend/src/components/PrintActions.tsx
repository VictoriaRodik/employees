import { IconButton } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

interface PrintActionsProps {
  onPreviewContract: () => void;
  onPreviewCashOrder: () => void;
  previewContractTitle?: string;
  previewCashOrderTitle?: string;
}

const PrintActions = ({
  onPreviewContract,
  onPreviewCashOrder,
  previewContractTitle = "View contract",
  previewCashOrderTitle = "View cash order",
}: PrintActionsProps) => {
  return (
    <>
      <IconButton title={previewContractTitle} onClick={onPreviewContract} color="primary">
        <AssignmentOutlinedIcon />
      </IconButton>
      <IconButton title={previewCashOrderTitle} onClick={onPreviewCashOrder} color="secondary">
        <ReceiptOutlinedIcon />
      </IconButton>
    </>
  );
};

export default PrintActions;