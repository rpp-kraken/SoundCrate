import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
import SongCardContainer from './SongCardContainer.jsx';
import NavBar from './NavBar.jsx';

const theme = createTheme({
  palette: {
    contrastThreshold: 4.5,
    primary: {
      light: "#a34ce7",
      main: "#7E1BCC",
      dark: "#541288",
    },
    secondary: {
      light: "#e349f3",
      main: "#CC0FE0",
      dark: "#8b0a98",
    },
    background: {
      default: "#541288",
    },
    text: {
      primary: "#f5f3f6",
    },
    error: {
      main: "#B00020",
    }
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
      fontSize: 'calc(22px + 0.390625vw',
      fontWeight: 700,
      lineHeight: 'calc(150%)',
    },
    h4: {
      fontSize: 'calc(20px + 0.390625vw',
      fontWeight: 700,
      lineHeight: 'calc(150%)',
    },
    bodyText: {
      fontSize: 'calc(16px + 0.390625vw',
      fontWeight: 400,
      lineHeight: 'calc(150%)',
    },
    bodyText2: {
      fontFamily: 'fontFamily2',
      fontSize: 'calc(16px + 0.390625vw',
      fontWeight: 400,
      lineHeight: 'calc(150%)',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {/* <ThemeExample /> */}
        <TopBar />
        <SongCardContainer />
        <NavBar />
    </ThemeProvider>
  );
}