import { PDFViewer } from '@react-pdf/renderer';
import CashOrderPDF from './CashOrderPDF';
import { ContractInterface } from '../../types/contract';
import { Modal, Box } from '@mui/material';

interface CashOrderPDFPreviewProps {
  contract: ContractInterface;
  open: boolean;
  onClose: () => void;
}

const CashOrderPDFPreview: React.FC<CashOrderPDFPreviewProps> = ({ contract, open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="contract-preview-modal"
  >
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      height: '90%',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 2,
    }}>
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <CashOrderPDF contract={contract} />
      </PDFViewer>
    </Box>
  </Modal>
);

export default CashOrderPDFPreview;