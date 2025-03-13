import { PDFViewer } from '@react-pdf/renderer';
import ContractPDF from './ContractPDF';
import { ContractInterface } from '../../types/contract';
import { Modal, Box } from '@mui/material';

interface ContractPDFPreviewProps {
  contract: ContractInterface;
  open: boolean;
  onClose: () => void;
}

const ContractPDFPreview: React.FC<ContractPDFPreviewProps> = ({ contract, open, onClose }) => (
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
        <ContractPDF contract={contract} />
      </PDFViewer>
    </Box>
  </Modal>
);

export default ContractPDFPreview;