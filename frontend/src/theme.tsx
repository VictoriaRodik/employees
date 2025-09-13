import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0077b6',
      light: '#90e0ef',
      dark: '#023e8a',
    },
    secondary: {
      main: '#ff6b6b',
      light: '#ff9f9f',
      dark: '#c70039',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212529',
      secondary: '#495057',
    },
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#48cae4',
      light: '#90e0ef',
      dark: '#0096c7',
    },
    secondary: {
      main: '#ff4d6d',
      light: '#ff758f',
      dark: '#c9184a',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e9ecef',
      secondary: '#adb5bd',
    },
  },
};

const commonSettings: ThemeOptions = {
  typography: {
    fontFamily: ' Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
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
          borderRadius: 10,
        },
        containedPrimary: {
          color: '#ffffff',
        },
        containedSecondary: {
          color: '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
};

export const light = createTheme({
  ...commonSettings,
  ...lightTheme,
});

export const dark = createTheme({
  ...commonSettings,
  ...darkTheme,
});