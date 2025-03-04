import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmployeeList from '../components/employeeComponents/EmployeeList';
import { useEmployees } from '../hooks/useEmployees';
import { EmployeeInterface } from '../types/employee';
import { UseMutationResult } from '@tanstack/react-query';

vi.mock('@tanstack/react-query');


vi.mock('../hooks/useEmployees', () => ({
  useEmployees: vi.fn(),
}));


vi.mock('../components/employeeComponents/EmployeeTable', () => ({
  default: ({ employees, onEdit, onDelete }: { 
    employees: EmployeeInterface[], 
    onEdit: (employee: EmployeeInterface) => void, 
    onDelete: (id: number) => void 
  }) => (
    <div data-testid="employee-table">
      {employees.map((emp) => (
        <div key={emp.id}>
          {emp.fullName} - {emp.personnelNumber}
          <button onClick={() => onEdit(emp)}>Edit</button>
          <button onClick={() => onDelete(emp.id)}>Delete</button>
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


vi.mock('../components/employeeComponents/EmployeeFormModal', () => ({
  default: ({ open, title, onClose, onSubmit, initialValues }: { 
    open: boolean, 
    title: string, 
    onClose: () => void, 
    onSubmit: (employee: EmployeeInterface) => void, 
    initialValues?: EmployeeInterface 
  }) => (
    open ? (
      <div data-testid="modal">
        {title}
        <button data-testid="modal-close" onClick={onClose}>Close</button>
        <button
          data-testid="modal-submit"
          onClick={() => onSubmit(initialValues || { fullName: 'New Employee' } as EmployeeInterface)}
        >
          Submit
        </button>
      </div>
    ) : null
  ),
}));

describe('EmployeeList', () => {
  const mockEmployees: EmployeeInterface[] = [
    { id: 1, fullName: 'John Doe', personnelNumber: '1001', taxId: '1234567890', passportNumber: '1234567890', passportIssueDate: '2020-01-01', passportIssuedBy: 'Test' },
    { id: 2, fullName: 'Jane Smith', personnelNumber: '1002', taxId: '9876543210', passportNumber: '9876543210', passportIssueDate: '2020-01-01', passportIssuedBy: 'Test' },
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
    vi.mocked(useEmployees).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
      createEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      updateEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      deleteEmployee: createMockMutationResult<void, Error, number>(),
    });

    render(<EmployeeList />);
    expect(screen.getByText('Завантаження...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error('Fetch failed'),
      createEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      updateEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      deleteEmployee: createMockMutationResult<void, Error, number>(),
    });

    render(<EmployeeList />);
    expect(screen.getByText('Помилка при завантаженні')).toBeInTheDocument();
  });

  it('renders employee table with data', () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
      createEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      updateEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      deleteEmployee: createMockMutationResult<void, Error, number>(),
    });

    render(<EmployeeList />);
    expect(screen.getByTestId('employee-table')).toBeInTheDocument();
    expect(screen.getByText('John Doe - 1001')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith - 1002')).toBeInTheDocument();
  });

  it('filters employees by search', async () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
      createEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      updateEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      deleteEmployee: createMockMutationResult<void, Error, number>(),
    });

    render(<EmployeeList />);
    const searchInput = screen.getByTestId('search-input');
    await userEvent.type(searchInput, 'Jane');
    expect(screen.getByText('Jane Smith - 1002')).toBeInTheDocument();
    expect(screen.queryByText('John Doe - 1001')).not.toBeInTheDocument();
  });

  it('sorts employees by personnel number', async () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
      createEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      updateEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      deleteEmployee: createMockMutationResult<void, Error, number>(),
    });

    render(<EmployeeList />);
    const sortSelect = screen.getByTestId('sort-select');
    await userEvent.selectOptions(sortSelect, 'personnelNumber');
    const table = screen.getByTestId('employee-table');
    const rows = table.children;
    expect(rows[0].textContent).toContain('John Doe - 1001');
    expect(rows[1].textContent).toContain('Jane Smith - 1002');
  });

  it('opens modal for adding employee', async () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
      createEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      updateEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      deleteEmployee: createMockMutationResult<void, Error, number>(),
    });

    render(<EmployeeList />);
    await userEvent.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Введення')).toBeInTheDocument();
  });

  it('opens modal for editing employee', async () => {
    vi.mocked(useEmployees).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
      createEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      updateEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      deleteEmployee: createMockMutationResult<void, Error, number>(),
    });

    render(<EmployeeList />);
    const editButtons = screen.getAllByText('Edit');
    await userEvent.click(editButtons[0]);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Редагування')).toBeInTheDocument();
  });

  // it('calls deleteEmployee on delete button click', async () => {
  //   const mockDelete = createMockMutationResult<void, Error, number>();
  //   vi.mocked(useEmployees).mockReturnValue({
  //     data: mockEmployees,
  //     isLoading: false,
  //     error: null,
  //     createEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
  //     updateEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
  //     deleteEmployee: mockDelete,
  //   });

  //   render(<EmployeeList />);
  //   const deleteButtons = screen.getAllByText('Delete');
  //   await userEvent.click(deleteButtons[0]);
  //   expect(mockDelete.mutate).toHaveBeenCalledWith(1);
  // });

  it('submits new employee and closes modal', async () => {
    const mockCreate = createMockMutationResult<void, Error, EmployeeInterface>();
    vi.mocked(useEmployees).mockReturnValue({
      data: mockEmployees,
      isLoading: false,
      error: null,
      createEmployee: mockCreate,
      updateEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
      deleteEmployee: createMockMutationResult<void, Error, number>(),
    });

    render(<EmployeeList />);
    await userEvent.click(screen.getByTestId('add-button'));
    await userEvent.click(screen.getByTestId('modal-submit'));
    await waitFor(() => {
      expect(mockCreate.mutate).toHaveBeenCalledWith({ fullName: 'New Employee' });
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  // it('submits updated employee and closes modal', async () => {
  //   const mockUpdate = createMockMutationResult<void, Error, EmployeeInterface>();
  //   vi.mocked(useEmployees).mockReturnValue({
  //     data: mockEmployees,
  //     isLoading: false,
  //     error: null,
  //     createEmployee: createMockMutationResult<void, Error, EmployeeInterface>(),
  //     updateEmployee: mockUpdate,
  //     deleteEmployee: createMockMutationResult<void, Error, number>(),
  //   });
// 
  //   render(<EmployeeList />);
  //   const editButtons = screen.getAllByText('Edit');
  //   await userEvent.click(editButtons[0]); // Edit John Doe
  //   await userEvent.click(screen.getByTestId('modal-submit'));
  //   await waitFor(() => {
  //     expect(mockUpdate.mutate).toHaveBeenCalledWith(mockEmployees[0]);
  //     expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  //   });
  // });
});