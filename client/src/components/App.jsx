import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import theme from '../themes/default.jsx';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
import Discover from './Discover.jsx'
import NavBar from './NavBar.jsx';
import Create from './Create.jsx';
import Profile from './Profile.jsx';
import Play from './Play.jsx';
import Publish from './Publish.jsx';
import {songData} from '../../../DummyData/dummyData.js'
import axios from 'axios';


export default function App() {
  const [ user, setUser ] = useState([]);
  const [ profileData, setProfileData ] = useState([]);
  const views = ['profile', 'create', 'discover', 'play', 'publish', 'theme', 'songcard'];

  // Play View: For Testing our S3 Bucket
  const [listOfTracks, setListOfTracks] = useState(['https://soundcrate.s3.us-east-2.amazonaws.com/9308db8f-dbd0-4ca7-b236-eda4f4b56b11.m4a']);

  const [view, setView] = useState('create');

  const handleSetUser = (data) => {
    setUser(data);
  }


  useEffect(
    () => {
      if (user) {
          axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
                }
            })
            .then((res) => {
                setProfileData(res.data);
                setView('profile');
            })
            .catch((err) => console.log(err));
        }
    },
    [ user ]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {view !== 'profile' && <TopBar setUser={handleSetUser}/>}
      {view === 'profile' && <Profile profileData={profileData}/>}
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