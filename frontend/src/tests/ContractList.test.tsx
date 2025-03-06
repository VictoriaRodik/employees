import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContractList from '../components/contractComponents/ContractList'; 
import { useContracts } from '../hooks/useContracts';
import { ContractInterface } from '../types/contract';
import { UseMutationResult } from '@tanstack/react-query';

vi.mock('@tanstack/react-query');

vi.mock('../hooks/useContracts', () => ({
  useContracts: vi.fn(),
}));


vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    CircularProgress: vi.fn(() => <div data-testid="circular-progress"></div>),
  };
});

vi.mock('../utils/contractFormatted', () => ({
  contractFormatted: vi.fn((contract: ContractInterface) => contract),
}));

vi.mock('../components/contractComponents/ContractTable', () => ({
  default: ({ contracts, onEdit, onDelete }: { 
    contracts: ContractInterface[], 
    onEdit: (contract: ContractInterface) => void, 
    onDelete: (id: number) => void 
  }) => (
    <div data-testid="contract-table">
      {contracts.map((contract) => (
        <div key={contract.id}>
          {contract.fullName} - {contract.contractDate}
          <button onClick={() => onEdit(contract)}>Edit</button>
          <button onClick={() => onDelete(contract.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../components/Search', () => ({
  default: ({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <input
      data-testid="search-input"
      value={value}
      onChange={onChange}
    />
  ),
}));

vi.mock('../components/Sort', () => ({
  default: ({ value, onChange, options }: { 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, 
    options: { value: string, label: string }[] 
  }) => (
    <select data-testid="sort-select" value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
}));

vi.mock('../components/Button', () => ({
  default: ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => (
    <button data-testid="add-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('../components/contractComponents/ContractFormModal', () => ({
  default: ({ open, title, onClose, onSubmit, initialValues }: { 
    open: boolean, 
    title: string, 
    onClose: () => void, 
    onSubmit: (contract: ContractInterface) => void, 
    initialValues?: ContractInterface 
  }) => (
    open ? (
      <div data-testid="modal">
        {title}
        <button data-testid="modal-close" onClick={onClose}>Close</button>
        <button
          data-testid="modal-submit"
          onClick={() => onSubmit(initialValues || { fullName: 'New Contract' } as ContractInterface)}
        >
          Submit
        </button>
      </div>
    ) : null
  ),
}));

describe('ContractList', () => {
  const mockContracts: ContractInterface[] = [
    {
      id: 1,
      fullName: 'John Doe',
      contractDate: '2023-01-01',
      employeeId: '1',
      contractAmount: '1000',
      contractEndDate: '2023-01-01',
      contractContent: 'Contract Content',
      contractNumber: 'C001',
      taxId: '1234567890',
      passportNumber: 'AB123456',
      passportIssueDate: '2020-01-01',
      passportIssuedBy: 'Authority'
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      contractDate: '2023-02-01',
      employeeId: '2',
      contractAmount: '2000',
      contractEndDate: '2023-02-01',
      contractContent: 'Contract Content',
      contractNumber: 'C002',
      taxId: '0987654321',
      passportNumber: 'CD789012',
      passportIssueDate: '2020-02-01',
      passportIssuedBy: 'Authority'
    }
  ];

  const createMockMutationResult = <TData, TError, TVariables>(): UseMutationResult<TData, TError, TVariables, unknown> => ({
    mutate: vi.fn(),
    mutateAsync: vi.fn(),
    data: undefined,
    error: null,
    failureCount: 0,
    failureReason: null,
    isError: false,
    isIdle: true,
    isLoading: false,
    isPaused: false,
    isSuccess: false,
    status: 'idle',
    reset: vi.fn(),
    variables: undefined,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    vi.mocked(useContracts).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
      createContract: createMockMutationResult<void, Error, ContractInterface>(),
      updateContract: createMockMutationResult<void, Error, ContractInterface>(),
      deleteContract: createMockMutationResult<void, Error, number>(),
    });

    render(<ContractList />);
    expect(screen.getByTestId("circular-progress")).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useContracts).mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error('Fetch failed'),
      createContract: createMockMutationResult<void, Error, ContractInterface>(),
      updateContract: createMockMutationResult<void, Error, ContractInterface>(),
      deleteContract: createMockMutationResult<void, Error, number>(),
    });

    render(<ContractList />);
    expect(screen.getByText('Помилка при завантаженні')).toBeInTheDocument();
  });

  it('renders contract table with data', () => {
    vi.mocked(useContracts).mockReturnValue({
      data: mockContracts,
      isLoading: false,
      error: null,
      createContract: createMockMutationResult<void, Error, ContractInterface>(),
      updateContract: createMockMutationResult<void, Error, ContractInterface>(),
      deleteContract: createMockMutationResult<void, Error, number>(),
    });

    render(<ContractList />);
    expect(screen.getByTestId('contract-table')).toBeInTheDocument();
    expect(screen.getByText('John Doe - 2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith - 2023-02-01')).toBeInTheDocument();
  });

  it('filters contracts by search', async () => {
    vi.mocked(useContracts).mockReturnValue({
      data: mockContracts,
      isLoading: false,
      error: null,
      createContract: createMockMutationResult<void, Error, ContractInterface>(),
      updateContract: createMockMutationResult<void, Error, ContractInterface>(),
      deleteContract: createMockMutationResult<void, Error, number>(),
    });

    render(<ContractList />);
    const searchInput = screen.getByTestId('search-input');
    await userEvent.type(searchInput, 'Jane');
    expect(screen.getByText('Jane Smith - 2023-02-01')).toBeInTheDocument();
    expect(screen.queryByText('John Doe - 2023-01-01')).not.toBeInTheDocument();
  });

  it('sorts contracts by contract date', async () => {
    vi.mocked(useContracts).mockReturnValue({
      data: mockContracts,
      isLoading: false,
      error: null,
      createContract: createMockMutationResult<void, Error, ContractInterface>(),
      updateContract: createMockMutationResult<void, Error, ContractInterface>(),
      deleteContract: createMockMutationResult<void, Error, number>(),
    });

    render(<ContractList />);
    const sortSelect = screen.getByTestId('sort-select');
    await userEvent.selectOptions(sortSelect, 'contractDate');
    const table = screen.getByTestId('contract-table');
    const rows = table.children;
    expect(rows[0].textContent).toContain('John Doe - 2023-01-01');
    expect(rows[1].textContent).toContain('Jane Smith - 2023-02-01');
  });

  it('opens modal for adding contract', async () => {
    vi.mocked(useContracts).mockReturnValue({
      data: mockContracts,
      isLoading: false,
      error: null,
      createContract: createMockMutationResult<void, Error, ContractInterface>(),
      updateContract: createMockMutationResult<void, Error, ContractInterface>(),
      deleteContract: createMockMutationResult<void, Error, number>(),
    });

    render(<ContractList />);
    await userEvent.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Введення')).toBeInTheDocument();
  });

  it('opens modal for editing contract', async () => {
    vi.mocked(useContracts).mockReturnValue({
      data: mockContracts,
      isLoading: false,
      error: null,
      createContract: createMockMutationResult<void, Error, ContractInterface>(),
      updateContract: createMockMutationResult<void, Error, ContractInterface>(),
      deleteContract: createMockMutationResult<void, Error, number>(),
    });

    render(<ContractList />);
    const editButtons = screen.getAllByText('Edit');
    await userEvent.click(editButtons[0]); // Edit John Doe
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Редагування')).toBeInTheDocument();
  });

  it('calls deleteContract on delete button click', async () => {
    const mockDelete = createMockMutationResult<void, Error, number>();
    vi.mocked(useContracts).mockReturnValue({
      data: mockContracts,
      isLoading: false,
      error: null,
      createContract: createMockMutationResult<void, Error, ContractInterface>(),
      updateContract: createMockMutationResult<void, Error, ContractInterface>(),
      deleteContract: mockDelete,
    });

    render(<ContractList />);
    const deleteButtons = screen.getAllByText('Delete');
    await userEvent.click(deleteButtons[0]); // Delete John Doe
    expect(mockDelete.mutate).toHaveBeenCalled();
  });

  it('submits new contract and closes modal', async () => {
    const mockCreate = createMockMutationResult<void, Error, ContractInterface>();
    vi.mocked(useContracts).mockReturnValue({
      data: mockContracts,
      isLoading: false,
      error: null,
      createContract: mockCreate,
      updateContract: createMockMutationResult<void, Error, ContractInterface>(),
      deleteContract: createMockMutationResult<void, Error, number>(),
    });

    render(<ContractList />);
    await userEvent.click(screen.getByTestId('add-button'));
    await userEvent.click(screen.getByTestId('modal-submit'));
    await waitFor(() => {
      expect(mockCreate.mutate).toHaveBeenCalledWith({ fullName: 'New Contract' });
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  // it('submits updated contract and closes modal', async () => {
  //   const mockUpdate = createMockMutationResult<void, Error, ContractInterface>();
  //   vi.mocked(useContracts).mockReturnValue({
  //     data: mockContracts,
  //     isLoading: false,
  //     error: null,
  //     createContract: createMockMutationResult<void, Error, ContractInterface>(),
  //     updateContract: mockUpdate,
  //     deleteContract: createMockMutationResult<void, Error, number>(),
  //   });

  //   render(<ContractList />);
  //   const editButtons = screen.getAllByText('Edit');
  //   await userEvent.click(editButtons[0]); // Edit John Doe
  //   await userEvent.click(screen.getByTestId('modal-submit'));
  //   await waitFor(() => {
  //     expect(mockUpdate.mutate).toHaveBeenCalledWith(mockContracts[0]);
  //     expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  //   });
  // });
});