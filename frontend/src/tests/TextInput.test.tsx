import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TextInput from '../components/TextInput';
import { useField } from 'formik';


vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    TextField: vi.fn(({ label, value, onChange, onBlur, type, multiline, rows, fullWidth, error, helperText }) => (
      <input
        data-testid="text-field"
        placeholder={label}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        data-multiline={multiline ? 'true' : 'false'}
        data-rows={rows}
        style={{ width: fullWidth ? '100%' : 'auto' }}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={helperText ? 'helper-text' : undefined}
      />
    )),
  };
});


vi.mock('formik', () => ({
  useField: vi.fn(),
}));

describe('TextInput', () => {
  const mockField = {
    name: 'testField',
    value: 'testValue',
    onChange: vi.fn(),
    onBlur: vi.fn(),
  };
  const mockMeta = {
    touched: false,
    error: '',
    value: undefined,
    initialTouched: false,
    initialValue: undefined,
    initialError: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useField).mockReturnValue([
      mockField, 
      mockMeta,
      { setValue: vi.fn(), setTouched: vi.fn(), setError: vi.fn() }
    ]);
  });

  it('renders TextField with default props', () => {
    render(<TextInput name="testField" label="Test Label" />);
    const input = screen.getByTestId('text-field');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Test Label');
    expect(input).toHaveValue('testValue');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('data-multiline', 'false');
    expect(input).toHaveAttribute('data-rows', '1');
    expect(input).toHaveStyle('width: 100%');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('renders with custom props', () => {
    render(
      <TextInput
        name="testField"
        label="Custom Label"
        type="password"
        multiline={true}
        rows={4}
        fullWidth={false}
      />
    );
    const input = screen.getByTestId('text-field');
    expect(input).toHaveAttribute('placeholder', 'Custom Label');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('data-multiline', 'true');
    expect(input).toHaveAttribute('data-rows', '4');
    expect(input).toHaveStyle('width: auto');
  });


  it('does not show error when field is not touched', () => {
    vi.mocked(useField).mockReturnValue([
      mockField,
      { 
        touched: false, 
        error: 'This field is required',
        value: undefined,
        initialTouched: false,
        initialValue: undefined,
        initialError: ''
      },
      { setValue: vi.fn(), setTouched: vi.fn(), setError: vi.fn() }
    ]);
    render(<TextInput name="testField" label="Test Label" />);
    const input = screen.getByTestId('text-field');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
  });
});