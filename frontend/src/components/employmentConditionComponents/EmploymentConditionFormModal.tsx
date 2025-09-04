import Modal from "../Modal";
import EmploymentConditionForm from "./EmploymentConditionForm";
import { EmploymentConditionInterface } from "../../types/employmentCondition";

interface employmentConditionFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (employmentCondition: EmploymentConditionInterface) => void;
  title: string;
  initialValues?: EmploymentConditionInterface | null;
}

const employmentConditionFormModal: React.FC<
  employmentConditionFormModalProps
> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <EmploymentConditionForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </Modal>
  );
};

export default employmentConditionFormModal;
