import Modal from "../Modal";
import OrderTypeForm from "./OrderTypeForm";
import { OrderTypeInterface } from "../../types/orderType";

interface orderTypeFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (orderType: OrderTypeInterface) => void;
  title: string;
  initialValues?: OrderTypeInterface | null;
}

const orderTypeFormModal: React.FC<
  orderTypeFormModalProps
> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <OrderTypeForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </Modal>
  );
};

export default orderTypeFormModal;
