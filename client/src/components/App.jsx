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

  const [listOfTracks, setListOfTracks] = useState(['https://dl.dropboxusercontent.com/s/d539eig06ioc35s/one%20two.webm?dl=0']);

  // const [view, setView] = useState('profile')
  // const [view, setView] = useState('create')
  const [view, setView] = useState('play')


  let trackUrlSources = [
    // 'https://s3-us-west-1.amazonaws.com/leesamples/samples/Rhythmics/60+bpm/Ping+Pong+Ping.mp3',
    // 'https://dl.dropboxusercontent.com/s/w303ydczmgrkfh8/New%20Recording%2075.m4a?dl=0',
    // 'https://tonejs.github.io/audio/berklee/gong_1.mp3',
    // 'https://dl.dropboxusercontent.com/s/1emccgj2kebg72a/Transient.m4a?dl=0',
    // 'https://dl.dropboxusercontent.com/s/c9aome2s0wr4ym7/Cymatics%20-%2021%20Inch%20Ride%20-%20Velocity%204.wav?dl=0',
    // 'https://dl.dropboxusercontent.com/s/3e7cinfd5ib9u5d/one%20two.m4a?dl=0',
    // 'https://dl.dropboxusercontent.com/s/d539eig06ioc35s/one%20two.webm?dl=0',
    'https://soundcrate.s3.us-east-2.amazonaws.com/9308db8f-dbd0-4ca7-b236-eda4f4b56b11.m4a'
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {view !== 'profile' && <TopBar />}
      {view === 'profile' && <Profile />}
      {view === 'create' && <Create />}
      {view === 'discover' && <Discover />}
      {listOfTracks.map((trackUrl, i) => { return <Play trackUrl={trackUrl} index={i} key={i} /> })}
      {/* {view === 'play' && <Play />} */}
      {view === 'publish' && <Publish />}
      {view === 'theme' && <ThemeExample />}
      {view === 'songcard' && <SongCard />}
      {view !== 'profile' && <NavBar />}
    </ThemeProvider>
  );
}