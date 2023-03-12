import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
import { GoogleLogin } from '@react-oauth/google';
import SongCardContainer from './SongCardContainer.jsx';
import NavBar from './NavBar.jsx';
import theme from '../themes/default.jsx';
import { GoogleLogin } from '@react-oauth/google';
import Login from '../components/login/Login.jsx';


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