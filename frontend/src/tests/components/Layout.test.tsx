import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Layout from '../../components/Layout';
import { useTheme } from '../../hooks/useTheme';

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    Box: vi.fn(({ children, sx }) => <div style={sx} data-testid="box">{children}</div>),
    AppBar: vi.fn(({ children }) => <div data-testid="app-bar">{children}</div>),
    Toolbar: vi.fn(({ children }) => <div data-testid="toolbar">{children}</div>),
    Typography: vi.fn(({ children }) => <span data-testid="typography">{children}</span>),
    Container: vi.fn(({ children }) => <div data-testid="container">{children}</div>),
    Drawer: vi.fn(({ children, sx, variant, open }) => (
      <div 
        style={sx} 
        data-testid={variant === 'permanent' ? 'permanent-drawer' : 'temporary-drawer'} 
        data-open={open}
      >
        {children}
      </div>
    )),
    List: vi.fn(({ children }) => <ul data-testid="list">{children}</ul>),
    ListItemButton: vi.fn(({ children, to, onClick }) => (
      <li data-testid={`list-item-${to}`} onClick={onClick}>{children}</li>
    )),
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

vi.mock('@mui/icons-material/Menu', () => ({
  default: () => <span data-testid="menu-icon" />,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Link: vi.fn(({ children, to }) => <a href={to} data-testid={`link-${to}`}>{children}</a>),
    Outlet: vi.fn(() => <div data-testid="outlet" />),
  };
});

vi.mock('../../hooks/useTheme', () => ({
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

  it('renders the layout structure with AppBar, Drawers, and main content', () => {
    render(<Layout />);
    expect(screen.getAllByTestId('box')[0]).toBeInTheDocument();
    expect(screen.getByTestId('app-bar')).toBeInTheDocument();
    expect(screen.getByTestId('permanent-drawer')).toBeInTheDocument();
    expect(screen.getByTestId('temporary-drawer')).toBeInTheDocument();
    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('renders AppBar with title, menu button, and theme toggle', () => {
    render(<Layout />);
    expect(screen.getByTestId('typography')).toHaveTextContent('Система управління договорами');
    expect(screen.getAllByTestId('icon-button')[0]).toBeInTheDocument();
    expect(screen.getAllByTestId('icon-button')[1]).toBeInTheDocument();
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    expect(screen.getByTestId('brightness4-icon')).toBeInTheDocument();
  });

  it('renders both Drawers with navigation links', () => {
    render(<Layout />);
    const lists = screen.getAllByTestId('list');
    expect(lists).toHaveLength(2); // One in each drawer
    expect(screen.getAllByTestId('list-item-/employees')).toHaveLength(2);
    expect(screen.getAllByTestId('list-item-/contracts')).toHaveLength(2);
    expect(screen.getAllByText('Співробітники')).toHaveLength(2);
    expect(screen.getAllByText('Договори')).toHaveLength(2);
    expect(screen.getAllByTestId('people-icon')).toHaveLength(2);
    expect(screen.getAllByTestId('description-icon')).toHaveLength(2);
  });

  it('toggles theme when theme button is clicked', () => {
    const toggleTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      isDarkMode: false,
      toggleTheme,
    });
    render(<Layout />);
    const themeButton = screen.getAllByTestId('icon-button')[1];
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

  it('toggles mobile drawer when menu button is clicked', () => {
    render(<Layout />);
    const menuButton = screen.getAllByTestId('icon-button')[0];
    const temporaryDrawer = screen.getByTestId('temporary-drawer');
    
    expect(temporaryDrawer).toHaveAttribute('data-open', 'false');
    fireEvent.click(menuButton);
    expect(temporaryDrawer).toHaveAttribute('data-open', 'true');
    fireEvent.click(menuButton);
    expect(temporaryDrawer).toHaveAttribute('data-open', 'false');
  });

  it('closes mobile drawer when navigation item is clicked', () => {
    render(<Layout />);
    const menuButton = screen.getAllByTestId('icon-button')[0];
    const temporaryDrawer = screen.getByTestId('temporary-drawer');
    const mobileNavItem = screen.getAllByTestId('list-item-/employees')[1];

    fireEvent.click(menuButton); // Open drawer
    expect(temporaryDrawer).toHaveAttribute('data-open', 'true');
    fireEvent.click(mobileNavItem);
    expect(temporaryDrawer).toHaveAttribute('data-open', 'false');
  });

  it('applies correct styles to permanent drawer', () => {
    render(<Layout />);
    const permanentDrawer = screen.getByTestId('permanent-drawer');
    expect(permanentDrawer).toHaveStyle('width: 240px');
    expect(permanentDrawer).toHaveStyle('flex-shrink: 0');
  });

  it('applies correct styles to main content area', () => {
    render(<Layout />);
    const mainBox = screen.getAllByTestId('box')[4];
    expect(mainBox).toHaveStyle('flex-grow: 1');
    expect(mainBox).toHaveStyle('min-height: 100vh');
  });
});