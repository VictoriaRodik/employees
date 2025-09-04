import Modal from "../Modal";
import FieldDefinitionForm from "./FieldDefinitionForm";
import { FieldDefinitionInterface } from "../../types/fieldDefinition";

interface fieldDefinitionFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (fieldDefinition: FieldDefinitionInterface) => void;
  title: string;
  initialValues?: FieldDefinitionInterface | null;
}

const fieldDefinitionFormModal: React.FC<
  fieldDefinitionFormModalProps
> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <FieldDefinitionForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </Modal>
  );
};

export default fieldDefinitionFormModal;
