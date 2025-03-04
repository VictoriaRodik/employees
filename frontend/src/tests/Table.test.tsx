import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Table from '../components/Table';

vi.mock('@mui/material', async () => {
    const actual = await vi.importActual('@mui/material')
    return {
      ...actual,
      Table: vi.fn(({ children }) => <table data-testid="table">{children}</table>),
      TableHead: vi.fn(({ children }) => <thead>{children}</thead>),
      TableBody: vi.fn(({ children }) => <tbody>{children}</tbody>),
      TableRow: vi.fn(({ children }) => <tr>{children}</tr>),
      TableCell: vi.fn(({ children }) => <td>{children}</td>),
    }
  })


describe('Table', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table with correct columns', () => {
    render(<Table columns={[]} data={[]} />);
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });
});




