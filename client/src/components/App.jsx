import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import theme from '../themes/default.jsx';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
import Discover from './Discover.jsx'
import SongCard from './SongCard.jsx';
import NavBar from './NavBar.jsx';
import Create from './Create.jsx';
import Profile from './Profile.jsx';
import Play from './Play.jsx';
import Publish from './Publish.jsx';
import {songData} from '../../../DummyData/dummyData.js'

export default function App() {
  const views = ['profile', 'create', 'discover', 'play', 'publish', 'theme', 'songcard'];

  // Play View: For Testing our S3 Bucket
  const [listOfTracks, setListOfTracks] = useState(['https://soundcrate.s3.us-east-2.amazonaws.com/9308db8f-dbd0-4ca7-b236-eda4f4b56b11.m4a']);

  const [view, setView] = useState('discover')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {view !== 'profile' && <TopBar />}
      {view === 'profile' && <Profile />}
      {view === 'create' && <Create />}
      {view === 'discover' && <Discover songs={songData} />}
      {/* {listOfTracks.map((trackUrl, i) => { return <Play trackUrl={trackUrl} index={i} key={i} /> })} */}
      {/* {view === 'play' && <Play />} */}
      {view === 'publish' && <Publish />}
      {view === 'theme' && <ThemeExample />}
      {view === 'songcard' && <SongCard />}
      {view !== 'profile' && <NavBar />}
    </ThemeProvider>
  );
}