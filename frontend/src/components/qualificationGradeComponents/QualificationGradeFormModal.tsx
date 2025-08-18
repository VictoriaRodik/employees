import Modal from "../Modal";
import QualificationGradeForm from "./QualificationGradeForm";
import { QualificationGradeInterface } from "../../types/qualificationGrade";

interface qualificationGradeFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (qualificationGrade: QualificationGradeInterface) => void;
  title: string;
  initialValues?: QualificationGradeInterface | null;
}

const qualificationGradeFormModal: React.FC<
  qualificationGradeFormModalProps
> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <QualificationGradeForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </Modal>
  );
};

export default qualificationGradeFormModal;
