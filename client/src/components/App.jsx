import React, { useState, useEffect, Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container } from '@mui/material/';
import theme from '../themes/default.jsx';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
import Home from './Home.jsx';
import Create from './Create.jsx';
import Favorites from './Favorites.jsx';
import NavBar from './NavBar.jsx';
import NewAccount from '../components/login/NewAccount.jsx';
import ArtistProfile from './ArtistProfile.jsx';
import MyReleasedMusic from './MyReleasedMusic.jsx';
import ConfirmLogOut from './ConfirmLogOut.jsx';
import ConfirmDeleteAccount from './ConfirmDeleteAccount.jsx';
import Play from './Play.jsx';
// import Publish from './Publish.jsx';
import FourOhFour from './404.jsx';
// import { songData } from '../../../DummyData/dummyData.js'
import Splash from '../components/login/Splash.jsx';
import axios from 'axios';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [artistData, setArtistData] = useState();
  const [songData, setSongData] = useState();
  const [songAllHomeData, setSongAllHomeData] = useState([]);
  const [collaborateSongPath, setCollaborateSongPath] = useState(null);
  const [firstRender, setFirstRender] = useState(true);

  // View State changes on click
  const [view, setView] = useState({ name: 'splash' });

  useEffect(() => {
    console.log("Changing view to: " + view.name);
    if (view.name === 'home') {
      if (firstRender === true) {
        setFirstRender(false)
      } else {
        axios.get(`/api/getAllSongsHome`)
        .then((res) => {
          console.log("New Data from deployed DB: ", res.data);
          setSongAllHomeData(res.data);
        })
        .catch((err) => console.log(err));
      }
    }
  }, [view])

  useEffect(() => {
    axios.get(`/api/getAllSongsHome`)
      .then((res) => {
        console.log("Data from deployed DB: ", res.data);
        setSongAllHomeData(res.data);
      })
      .catch((err) => console.log(err));
  }, [])

  const changeView = (name) => {
    setView({ name });
  };

  const handleSetArtistSongData = (artistName, songData) => {
    if (artistName) {
      var artistProfileData;
      axios.get(`/api/userbycol?col=username&val=${artistName}`)
      .then((result) => {
        artistProfileData = result.data;
      })
      .then(() => {
        axios.get(`/api/songs?user=${artistProfileData.name}`)
        .then((result) => {
          if (result.data) {
            artistProfileData.songCount = result.data.length;
            artistProfileData.favoritesCount = result.data.reduce((total, obj) => obj.fav_count + total, 0);
            artistProfileData.songs = result.data;
          }
          setArtistData(artistProfileData);
          changeView('profile');
        })
      })
      .catch((err) => console.log('error in artistName', err));
    } else if (songData) {
      setSongData(songData);
    }
  }

  useEffect(
    () => {
      if (user.length !== 0) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
          .then((res) => {
            setProfileData(res.data);
            return axios.get(`api/userbycol?col=email&val=${res.data.email}`)
          })
          .then(async (res) => {
            let keys = Object.keys(res.data)
            if (keys.length === 0) {
              changeView('newAccount');
            } else {
              setLoggedIn(true);
              setProfileData(res.data);
              changeView('home');
            }
            setUser({});
          })
          .catch((err) => console.log('error in oauth', err));
      }
    },
    [user]
  );
//
  const renderView = () => {
    switch (view.name) {
      case "splash":
        return <Splash />;
      case "home":
        return <Home songs={songAllHomeData} changeView={changeView} handleSetArtistSongData={handleSetArtistSongData} profileData={profileData} view={view}/>;
      case "create":
        return <Create changeView={changeView} collaborateSongPath={collaborateSongPath} profileData={profileData} />;
      case "favorites":
        return <Favorites changeView={changeView} profileData={profileData} view={view} handleSetArtistSongData={handleSetArtistSongData}/>;
      case "newAccount":
        return <NewAccount changeView={changeView} profileData={profileData} setProfileData={setProfileData} setLoggedIn={setLoggedIn} />;
      case "profile":
        return <ArtistProfile changeView={changeView} artistData={artistData} profileData={profileData} setProfileData={setProfileData} handleSetArtistSongData={handleSetArtistSongData} loggedIn={loggedIn} />;
      case "play":
        return <Play changeView={changeView} songData={songData} setCollaborateSongPath={setCollaborateSongPath} profileData={profileData}/>;
      case "myReleasedMusic":
        return <MyReleasedMusic changeView={changeView} profileData={profileData} handleSetArtistSongData={handleSetArtistSongData} />;
      case "confirmLogOut":
        return <ConfirmLogOut changeView={changeView} setProfileData={setProfileData} setLoggedIn={setLoggedIn} />;
      case "confirmDeleteAccount":
        return <ConfirmDeleteAccount changeView={changeView} profileData={profileData} setProfileData={setProfileData} setLoggedIn={setLoggedIn} />;
      case "theme":
        return <ThemeExample />;
      default:
        return <FourOhFour />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {<TopBar setUser={setUser} changeView={changeView} profileData={profileData} handleSetArtistSongData={handleSetArtistSongData} loggedIn={loggedIn}/>}
      <Container id='main-app-container' maxWidth={'sm'} sx={{ padding: 0 }}>
        <Suspense fallback={<p>Loading...</p>}>{renderView()}</Suspense>
      </Container>
      { loggedIn && <NavBar changeView={changeView} />}
    </ThemeProvider>
  );
}
