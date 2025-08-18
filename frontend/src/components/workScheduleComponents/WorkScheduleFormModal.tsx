import Modal from "../Modal";
import WorkScheduleForm from "./WorkScheduleForm";
import { WorkScheduleInterface } from "../../types/workSchedule";

interface workScheduleFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (workSchedule: WorkScheduleInterface) => void;
  title: string;
  initialValues?: WorkScheduleInterface | null;
}

const workScheduleFormModal: React.FC<
  workScheduleFormModalProps
> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <WorkScheduleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </Modal>
  );
};

export default workScheduleFormModal;
