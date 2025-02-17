import Modal from "./Modal";
import EmployeeForm from "./EmployeeForm";
import { EmployeeInterface } from "../types/employee";

interface EmployeeFormModalProps {
  open: boolean;
  onClose: () => void;
  initialValues?: EmployeeInterface;
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ open, onClose, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <EmployeeForm initialValues={initialValues} onClose={onClose} />
    </Modal>
  );
};

export default EmployeeFormModal;
