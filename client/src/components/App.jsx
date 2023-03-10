import React from 'react';
import {red} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
import SongCardContainer from './SongCardContainer.jsx';
import NavBar from './NavBar.jsx';

const theme = createTheme({
  palette: {
    primary: {
      light: "",
      main: "#7951A8",
      dark: "",
    },
    secondary: {
      main: "#9356A0",
    },
    background: {
      default: "#69369E",
    },
    text: {
      primary: "#e0c5ed",
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontFamily2: 'Open Sans, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    bodyText: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    bodyText2: {
      fontFamily: 'fontFamily2',
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.2,
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