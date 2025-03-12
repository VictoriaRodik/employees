import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContractForm from '../../components/contractComponents/ContractForm';
import { useEmployees } from '../../hooks/useEmployees';
import { ContractInterface } from '../../types/contract';
import { EmployeeInterface } from '../../types/employee';

vi.mock('../../hooks/useEmployees', () => ({
  useEmployees: vi.fn(),
}));

vi.mock('../../utils/contractFormatted', () => ({
  contractFormatted: (contract: ContractInterface) => ({
    ...contract,
    contractDate: new Date(contract.contractDate).toLocaleDateString('en-CA'),
    contractEndDate: new Date(contract.contractEndDate).toLocaleDateString('en-CA'),
    passportIssueDate: new Date(contract.passportIssueDate).toLocaleDateString('en-CA'),
  }),
}));

describe('ContractForm', () => {
  const mockEmployees: EmployeeInterface[] = [
    { id: 1, fullName: 'John Doe', personnelNumber: '001', taxId: '1234567890', address: '', passportSeries: 'AB', passportNumber: '123456', passportIssueDate: '2023-01-01', passportIssuedBy: 'Office' },
    { id: 2, fullName: 'Jane Smith', personnelNumber: '002', taxId: '0987654321', address: '', passportSeries: 'CD', passportNumber: '654321', passportIssueDate: '2022-12-01', passportIssuedBy: 'Hall' },
  ];

  const mockOnSubmit = vi.fn();
  const mockOnClose = vi.fn();

  const defaultProps = {
    onSubmit: mockOnSubmit,
    onClose: mockOnClose,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useEmployees as any).mockReturnValue({ data: mockEmployees });
  });

  it('renders all fields with default values', () => {
    render(<ContractForm {...defaultProps} />);

    expect(screen.getByLabelText('Співробітник')).toBeInTheDocument();
    expect(screen.getByLabelText('Дата контракту')).toBeInTheDocument();
    expect(screen.getByLabelText('Дата закінчення контракту')).toBeInTheDocument();
    expect(screen.getByLabelText('Сума контракту')).toBeInTheDocument();
    expect(screen.getByLabelText('Номер контракту')).toBeInTheDocument();
    expect(screen.getByLabelText('Зміст контракту')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Додати' })).toBeInTheDocument();
  });

  it('renders employee options in select field', async () => {
    render(<ContractForm {...defaultProps} />);

    await userEvent.click(screen.getByLabelText('Співробітник'));
    expect(screen.getByText('John Doe (001)')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith (002)')).toBeInTheDocument();
  });

  it('renders with initial values when provided', async () => {
    const initialValues: ContractInterface = {
      id: 1,
      employeeId: '1',
      contractDate: '2023-01-01',
      contractEndDate: '2023-12-31',
      contractAmount: '1000.50',
      contractContent: 'Test contract',
      contractNumber: 'C123',
      taxId: '',
      fullName: '',
      passportSeries: '',
      passportNumber: '',
      passportIssueDate: '2023-01-01',
      passportIssuedBy: '',
    };

    render(<ContractForm {...defaultProps} initialValues={initialValues} />);

    const contractDateInput = screen.getByLabelText('Дата контракту') as HTMLInputElement;

    await waitFor(() => {
      const hiddenInput = screen.getByDisplayValue('1');
      expect(hiddenInput).toHaveAttribute('name', 'employeeId');
      expect(contractDateInput.value).toBe('2023-01-01');
    });
    expect(screen.getByRole('button', { name: 'Зберегти зміни' })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(<ContractForm {...defaultProps} />);

    const user = userEvent.setup();

    await user.click(screen.getByLabelText('Співробітник'));
    await user.click(screen.getByText('John Doe (001)'));

    fireEvent.change(screen.getByLabelText('Дата контракту'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('Дата закінчення контракту'), { target: { value: '2023-12-31' } });
    fireEvent.change(screen.getByLabelText('Сума контракту'), { target: { value: '1000.50' } });
    fireEvent.change(screen.getByLabelText('Номер контракту'), { target: { value: 'C123' } });
    fireEvent.change(screen.getByLabelText('Зміст контракту'), { target: { value: 'Test contract' } });

    fireEvent.click(screen.getByRole('button', { name: 'Додати' }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          employeeId: 1, // Changed to number
          contractDate: '2023-01-01',
          contractEndDate: '2023-12-31',
          contractAmount: '1000.50',
          contractNumber: 'C123',
          contractContent: 'Test contract',
        }),
        expect.any(Object)
      );
    });
  });

  it('disables submit button when submitting', async () => {
    const slowOnSubmit = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<ContractForm {...defaultProps} onSubmit={slowOnSubmit} />);

    const user = userEvent.setup();
    await user.click(screen.getByLabelText('Співробітник'));
    await user.click(screen.getByText('John Doe (001)'));

    fireEvent.change(screen.getByLabelText('Дата контракту'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('Дата закінчення контракту'), { target: { value: '2023-12-31' } });
    fireEvent.change(screen.getByLabelText('Сума контракту'), { target: { value: '1000.50' } });
    fireEvent.change(screen.getByLabelText('Номер контракту'), { target: { value: 'C123' } });
    fireEvent.change(screen.getByLabelText('Зміст контракту'), { target: { value: 'Test contract' } });

    const submitButton = screen.getByRole('button', { name: 'Додати' });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(slowOnSubmit).toHaveBeenCalled(), { timeout: 200 });
  });

  it('does not call onSubmit with invalid data', async () => {
    render(<ContractForm {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Додати' }));

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    }, { timeout: 1000 });
  });

  it('shows validation errors on submit with invalid data', async () => {
    render(<ContractForm {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Додати' }));

    await waitFor(() => {
      const errors = screen.getAllByText("Обов'язкове поле");
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});