import { createTheme, ThemeOptions } from '@mui/material/styles';

// Light theme colors (green-based)
const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3c3ebd',
      light: '#4237da',
      dark: '#1b5e20',
    },
    secondary: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c',
    },
    background: {
      default: '#f1f8e9',
      paper: '#ffffff',
    },
    text: {
      primary: '#1b5e20', 
      secondary: '#2e7d32',
    },
  },
};

// Dark theme colors (blue and grey based)
const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#424242',
      light: '#616161',
      dark: '#212121',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
};


const commonSettings: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

// Create themes with common settings
export const light = createTheme({
  ...commonSettings,
  ...lightTheme,
});

export const dark = createTheme({
  ...commonSettings,
  ...darkTheme,
});