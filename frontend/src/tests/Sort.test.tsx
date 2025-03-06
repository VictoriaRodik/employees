import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Sort from '../components/Sort'; // Adjust path as needed
import { SelectChangeEvent } from '@mui/material';


vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    Select: vi.fn(({ value, onChange, children, displayEmpty }) => (
      <select
        data-testid="select"
        value={value}
        onChange={(e) => onChange({ target: { value: e.target.value } } as SelectChangeEvent<string>)}
      >
        {displayEmpty && value === '' && <option value=""> </option>}
        {children}
      </select>
    )),
    MenuItem: vi.fn(({ value, children }) => (
      <option data-testid={`option-${value}`} value={value}>
        {children}
      </option>
    )),
  };
});

describe('Sort', () => {
  const mockOptions = [
    { value: 'name', label: 'By Name' },
    { value: 'number', label: 'By Number' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders select with provided value', () => {
    render(<Sort value="name" options={mockOptions} onChange={() => {}} />);
    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('name');
  });

  it('renders all options as menu items', () => {
    render(<Sort value="name" options={mockOptions} onChange={() => {}} />);
    expect(screen.getByTestId('option-name')).toHaveTextContent('By Name');
    expect(screen.getByTestId('option-number')).toHaveTextContent('By Number');
    expect(screen.queryAllByTestId(/option-/).length).toBe(2);
  });

  it('supports empty value with displayEmpty', () => {
    render(<Sort value="" options={mockOptions} onChange={() => {}} />);
    const select = screen.getByTestId('select');
    expect(select).toHaveValue('');
    const options = screen.getAllByTestId(/option-/);
    expect(options.length).toBe(2);
    expect(screen.getByTestId('option-name')).toBeInTheDocument();
    expect(screen.getByTestId('option-number')).toBeInTheDocument();
  });

  it('calls onChange with when selection changes', () => {
    const onChange = vi.fn();
    render(<Sort value="name" options={mockOptions} onChange={onChange} />);
    const select = screen.getByTestId('select');
    fireEvent.change(select, { target: { value: 'number' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});