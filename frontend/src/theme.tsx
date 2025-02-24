import { createTheme, ThemeOptions } from '@mui/material/styles';


const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#84A59D',
      light: '#F5CAC3',
      dark: '#F28482',
    },
    secondary: {
      main: '#F6BD60',
      light: '#F5CAC3',
      dark: '#F28482',
    },
    background: {
      default: '#F7EDE2',
      paper: '#ffffff',
    },
    text: {
      primary: '#2f2f30', 
      secondary: '#666666',
    },
  },
};


const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#63c8f3',
      light: '#2A6F97',
      dark: '#7c0107',
    },
    secondary: {
      main: '#c26169',
      light: '#89C2D9',
      dark: '#468FAF',
    },
    background: {
      default: '#012A4A',
      paper: '#013A63',
    },
    text: {
      primary: '#ffffff',
      secondary: '#A9D6E5',
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


export const light = createTheme({
  ...commonSettings,
  ...lightTheme,
});

export const dark = createTheme({
  ...commonSettings,
  ...darkTheme,
});