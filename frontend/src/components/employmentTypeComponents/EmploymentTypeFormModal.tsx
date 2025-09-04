import Modal from "../Modal";
import EmploymentTypeForm from "./EmploymentTypeForm";
import { EmploymentTypeInterface } from "../../types/employmentType";

interface employmentTypeFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (employmentType: EmploymentTypeInterface) => void;
  title: string;
  initialValues?: EmploymentTypeInterface | null;
}

const employmentTypeFormModal: React.FC<
  employmentTypeFormModalProps
> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <EmploymentTypeForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </Modal>
  );
};

export default employmentTypeFormModal;
