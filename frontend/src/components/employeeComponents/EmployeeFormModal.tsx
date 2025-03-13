import Modal from "../Modal";
import EmployeeForm from "./EmployeeForm";
import { EmployeeInterface } from "../../types/employee";

interface EmployeeFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (employee: EmployeeInterface) => void;
  title: string;
  initialValues?: EmployeeInterface | null;
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <EmployeeForm onSubmit={onSubmit} initialValues={initialValues} onClose={onClose} />
    </Modal>
  );
};

export default EmployeeFormModal;
