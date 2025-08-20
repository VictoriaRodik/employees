import Modal from "../Modal";
import ReferenceSourceForm from "./ReferenceSourceForm";
import { ReferenceSourceInterface } from "../../types/referenceSource";

interface referenceSourceFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (referenceSource: ReferenceSourceInterface) => void;
  title: string;
  initialValues?: ReferenceSourceInterface | null;
}

const referenceSourceFormModal: React.FC<
  referenceSourceFormModalProps
> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <ReferenceSourceForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </Modal>
  );
};

export default referenceSourceFormModal;
