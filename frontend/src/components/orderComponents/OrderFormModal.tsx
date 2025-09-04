import Modal from "../Modal";
import OrderForm from "./OrderForm";
import { OrderInterface } from "../../types/order";

interface orderFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (order: OrderInterface) => void;
  title: string;
  initialValues?: OrderInterface | null;
}

const orderFormModal: React.FC<
  orderFormModalProps
> = ({ open, onClose, title, onSubmit, initialValues }) => {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <OrderForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onClose={onClose}
      />
    </Modal>
  );
};

export default orderFormModal;
