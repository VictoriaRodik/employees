import Modal from "../Modal";
import PositionForm from "./PositionForm";
import { PositionInterface } from "../../types/position";

interface PositionFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (position: PositionInterface) => void;
  title: string;
  initialValues?: PositionInterface | null;
}

const PositionFormModal: React.FC<PositionFormModalProps> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <PositionForm onSubmit={onSubmit} initialValues={initialValues} onClose={onClose} />
    </Modal>
  );
};

export default PositionFormModal;
