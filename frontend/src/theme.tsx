import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0077b6', // Глибокий синій
      light: '#90e0ef', // Пастельний блакитний
      dark: '#023e8a', // Темний синій
    },
    secondary: {
      main: '#ff6b6b', // Яскравий червоний
      light: '#ff9f9f', // М'який рожевий
      dark: '#c70039', // Насичений темно-червоний
    },
    background: {
      default: '#f8f9fa', // Світло-сірий
      paper: '#ffffff', // Білий
    },
    text: {
      primary: '#212529', // Темний сірий
      secondary: '#495057', // Середній сірий
    },
  },
};

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#48cae4', // Бірюзовий акцент
      light: '#90e0ef', // Пастельний блакитний
      dark: '#0096c7', // Глибокий блакитний
    },
    secondary: {
      main: '#ff4d6d', // Яскравий рожево-червоний
      light: '#ff758f', // Світлий малиновий
      dark: '#c9184a', // Насичений темний червоний
    },
    background: {
      default: '#121212', // Дуже темний сірий
      paper: '#1e1e1e', // Темно-сірий
    },
    text: {
      primary: '#e9ecef', // Світлий текст
      secondary: '#adb5bd', // Світло-сірий текст
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