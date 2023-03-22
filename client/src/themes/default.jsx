import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    contrastThreshold: 4.5,
    primary: {
      light: '#a77ef6',
      main: '#864ff2',
      dark: '#6520ee',
    },
    secondary: {
      light: '#a34ce7',
      main: '#b061ff',
      dark: '#541288',
    },
    background: {
      default: '#3f3981',
      secondary: '#3A2F49',
    },
    text: {
      primary: '#ffffff',
    },
    error: {
      main: '#B00020',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontFamily2: 'Open Sans, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10
      },
      fontWeight: 700,
      lineHeight: 'calc(150%)',
    },
    h2: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10
      },
      fontWeight: 700,
      lineHeight: 'calc(150%)',
    },
    h3: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10
      },
      fontWeight: 700,
      lineHeight: 'calc(150%)',
    },
    h4: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10
      },
      fontWeight: 700,
      lineHeight: 'calc(150%)',
    },
    h5: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10
      },
      fontWeight: 700,
      lineHeight: 'calc(150%)',
    },
    bodyText: {
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10
      },
      fontWeight: 400,
      lineHeight: 'calc(150%)',
    },
    bodyText2: {
      fontFamily: 'fontFamily2',
      fontSize: {
        lg: 30,
        md: 20,
        sm: 15,
        xs: 10
      },
      fontWeight: 400,
      lineHeight: 'calc(150%)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#864ff2',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#6520ee',
          },
          marginBottom: '4EM',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;