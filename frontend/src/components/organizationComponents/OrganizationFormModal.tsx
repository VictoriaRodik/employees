import Modal from "../Modal";
import OrganizationForm from "./OrganizationForm";
import { OrganizationInterface } from "../../types/organization";

interface OrganizationFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (organization: OrganizationInterface) => void;
  title: string;
  initialValues?: OrganizationInterface | null;
}

const OrganizationFormModal: React.FC<OrganizationFormModalProps> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <OrganizationForm onSubmit={onSubmit} initialValues={initialValues} onClose={onClose} />
    </Modal>
  );
};

export default OrganizationFormModal;
