import Modal from "../Modal";
import DepartmentForm from "./DepartmentForm";
import { DepartmentInterface } from "../../types/department";

interface DepartmentFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (department: DepartmentInterface) => void;
  title: string;
  initialValues?: DepartmentInterface | null;
}

const DepartmentFormModal: React.FC<DepartmentFormModalProps> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <DepartmentForm onSubmit={onSubmit} initialValues={initialValues} onClose={onClose} />
    </Modal>
  );
};

export default DepartmentFormModal;
