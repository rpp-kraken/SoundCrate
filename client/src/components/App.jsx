import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import theme from '../themes/default.jsx';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
import SongCard from './SongCard.jsx';
import NavBar from './NavBar.jsx';
import Create from './Create.jsx';
import Profile from './Profile.jsx';
import Play from './Play.jsx';
import Publish from './Publish.jsx';


export default function App() {
  const views = ['profile', 'create', 'discover', 'play', 'publish', 'theme', 'songcard'];
  const [view, setView] = useState('songcard');

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {view !== 'profile' && <TopBar />}
        {view === 'profile' && <Profile />}
        {view === 'create' && <Create />}
        {view === 'discover' && <Discover />}
        {view === 'play' && <Play />}
        {view === 'publish' && <Publish />}
        {view === 'theme' && <ThemeExample />}
        {view === 'songcard' && <SongCard />}
        {view !== 'profile' && <NavBar />}
    </ThemeProvider>
  );
}