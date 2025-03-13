import Modal from "../Modal";
import ContractForm from "./ContractForm";
import { ContractInterface } from "../../types/contract";

interface ContractFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (contract: ContractInterface) => void;
  title: string;
  initialValues?: ContractInterface | null;
}

const ContractFormModal: React.FC<ContractFormModalProps> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <ContractForm onSubmit={onSubmit} initialValues={initialValues} onClose={onClose} />
    </Modal>
  );
};

export default ContractFormModal;
