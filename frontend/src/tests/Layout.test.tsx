import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Layout from '../components/Layout';
import { useTheme } from '../hooks/useTheme';

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    Box: vi.fn(({ children, sx }) => <div style={sx} data-testid="box">{children}</div>),
    AppBar: vi.fn(({ children }) => <div data-testid="app-bar">{children}</div>),
    Toolbar: vi.fn(({ children }) => <div data-testid="toolbar">{children}</div>),
    Typography: vi.fn(({ children }) => <span data-testid="typography">{children}</span>),
    Container: vi.fn(({ children }) => <div data-testid="container">{children}</div>),
    Drawer: vi.fn(({ children, sx }) => <div style={sx} data-testid="drawer">{children}</div>),
    List: vi.fn(({ children }) => <ul data-testid="list">{children}</ul>),
    ListItemButton: vi.fn(({ children, to }) => <li data-testid={`list-item-${to}`}>{children}</li>),
    ListItemIcon: vi.fn(({ children }) => <span data-testid="list-item-icon">{children}</span>),
    ListItemText: vi.fn(({ primary }) => <span data-testid="list-item-text">{primary}</span>),
    IconButton: vi.fn(({ children, onClick }) => (
      <button data-testid="icon-button" onClick={onClick}>{children}</button>
    )),
  };
});

vi.mock('@mui/icons-material/People', () => ({
  default: () => <span data-testid="people-icon" />,
}));

vi.mock('@mui/icons-material/Description', () => ({
  default: () => <span data-testid="description-icon" />,
}));

vi.mock('@mui/icons-material/Brightness4', () => ({
  default: () => <span data-testid="brightness4-icon" />,
}));

vi.mock('@mui/icons-material/Brightness7', () => ({
  default: () => <span data-testid="brightness7-icon" />,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: vi.fn(({ children, to }) => <a href={to} data-testid={`link-${to}`}>{children}</a>),
    Outlet: vi.fn(() => <div data-testid="outlet" />),
  };
});

vi.mock('../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('Layout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTheme).mockReturnValue({
      isDarkMode: false,
      toggleTheme: vi.fn(),
    });
  });

  it('renders the layout structure with AppBar, Drawer, and main content', () => {
    render(<Layout />);
    expect(screen.getAllByTestId('box')[0]).toBeInTheDocument();
    expect(screen.getByTestId('app-bar')).toBeInTheDocument();
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('renders AppBar with title and theme toggle button', () => {
    render(<Layout />);
    expect(screen.getByTestId('typography')).toHaveTextContent('Система управління договорами');
    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
    expect(screen.getByTestId('brightness4-icon')).toBeInTheDocument(); 
    expect(screen.queryByTestId('brightness7-icon')).not.toBeInTheDocument();
  });

  it('renders Drawer with navigation links', () => {
    render(<Layout />);
    expect(screen.getByTestId('list')).toBeInTheDocument();
    expect(screen.getByTestId('list-item-/employees')).toBeInTheDocument();
    expect(screen.getByTestId('list-item-/contracts')).toBeInTheDocument();
    expect(screen.getByText('Співробітники')).toBeInTheDocument();
    expect(screen.getByText('Договори')).toBeInTheDocument();
    expect(screen.getByTestId('people-icon')).toBeInTheDocument();
    expect(screen.getByTestId('description-icon')).toBeInTheDocument();
  });

  it('toggles theme to dark mode when button is clicked', () => {
    const toggleTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      isDarkMode: false,
      toggleTheme,
    });
    render(<Layout />);
    const themeButton = screen.getByTestId('icon-button');
    fireEvent.click(themeButton);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  it('shows Brightness7Icon when in dark mode', () => {
    vi.mocked(useTheme).mockReturnValue({
      isDarkMode: true,
      toggleTheme: vi.fn(),
    });
    render(<Layout />);
    expect(screen.getByTestId('brightness7-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('brightness4-icon')).not.toBeInTheDocument();
  });

  it('applies correct styles to main content area', () => {
    render(<Layout />);
    const mainBox = screen.getAllByTestId('box')[0]; 
    expect(mainBox).toHaveStyle('display: flex');
    expect(mainBox).toHaveStyle('min-height: 100vh');
    expect(mainBox).toHaveStyle('color: text.primary');
  });

  it('applies correct width to Drawer', () => {
    render(<Layout />);
    const drawer = screen.getByTestId('drawer');
    expect(drawer).toHaveStyle('width: 240px');
    expect(drawer).toHaveStyle('flex-shrink: 0');
  });
});