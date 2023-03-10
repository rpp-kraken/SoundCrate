import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
import SongCardContainer from './SongCardContainer.jsx';
import NavBar from './NavBar.jsx';
import theme from '../themes/default.jsx';


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