import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import theme from '../themes/default.jsx';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
<<<<<<< HEAD
import SongCardContainer from './SongCardContainer.jsx';
import Discover from './Discover.jsx'
=======
import SongCard from './SongCard.jsx';
>>>>>>> dev
import NavBar from './NavBar.jsx';
import Create from './Create.jsx';
import Profile from './Profile.jsx';
import Play from './Play.jsx';
import Publish from './Publish.jsx';
import {songData} from '../../../DummyData/dummyData.js'


export default function App() {
<<<<<<< HEAD
  const views = ['profile', 'create', 'discover', 'play', 'publish', 'theme', 'songcard']
  const [view, setView] = useState('discover')
=======
  const views = ['profile', 'create', 'discover', 'play', 'publish', 'theme', 'songcard'];
  const [view, setView] = useState('songcard');
>>>>>>> dev

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {view !== 'profile' && <TopBar />}
        {view === 'profile' && <Profile />}
        {view === 'create' && <Create />}
        {view === 'discover' && <Discover songs={songData} />}
        {view === 'play' && <Play />}
        {view === 'publish' && <Publish />}
        {view === 'theme' && <ThemeExample />}
        {view === 'songcard' && <SongCard />}
        {view !== 'profile' && <NavBar />}
    </ThemeProvider>
  );
}