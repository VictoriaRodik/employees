import { createTheme, ThemeOptions } from '@mui/material/styles';


const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#2EC4B6',
      light: '#CBF3F0',
      dark: '#FF9F1C',
    },
    secondary: {
      main: '#FF9F1C',
      light: '#FFBF69',
      dark: '#2EC4B6',
    },
    background: {
      default: '#ffffff',
      paper: '#fff8ee',
    },
    text: {
      primary: '#2f2f30', 
      secondary: '#696b6b',
    },
  },
};


const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#63c8f3',
      light: '#2A6F97',
      dark: '#b6030c',
    },
    secondary: {
      main: '#db0610',
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