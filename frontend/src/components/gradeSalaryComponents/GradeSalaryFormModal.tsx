import Modal from "../Modal";
import GradeSalaryForm from "./GradeSalaryForm";
import { GradeSalaryInterface } from "../../types/gradeSalary";

interface gradeSalaryFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (gradeSalary: GradeSalaryInterface) => void;
  title: string;
  initialValues?: GradeSalaryInterface | null;
}

const gradeSalaryFormModal: React.FC<
  gradeSalaryFormModalProps
> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <GradeSalaryForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </Modal>
  );
};

export default gradeSalaryFormModal;
