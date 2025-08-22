import Modal from "../Modal";
import OrderItemForm from "./OrderItemForm";
import { OrderItemInterface } from "../../types/orderItem";

interface orderItemFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (orderItem: OrderItemInterface) => void;
  title: string;
  initialValues?: OrderItemInterface | null;
}

const orderItemFormModal: React.FC<
  orderItemFormModalProps
> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <OrderItemForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </Modal>
  );
};

export default orderItemFormModal;
