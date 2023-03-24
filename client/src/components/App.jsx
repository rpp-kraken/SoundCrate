import React, { useState, useEffect, Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container } from '@mui/material/';
import theme from '../themes/default.jsx';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
import Home from './Home.jsx'
import Create from './Create.jsx';
import Favorites from './Favorites.jsx';
import Discover from './Discover.jsx'
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
import axios from 'axios';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [artistData, setArtistData] = useState();
  const [songData, setSongData] = useState();
  const [songAllHomeData, setSongAllHomeData] = useState([]);
  // const [changeNavBar, setChangeNavBar] = useState(0);

  const [collaborateSongPath, setCollaborateSongPath] = useState(null);
  // const views = ['profile', 'create', 'discover', 'play', 'publish', 'theme', 'songcard'];

  // View State changes on click
  const [view, setView] = useState({ name: 'home' });

  useEffect(() => {
    console.log("Changing view to: " + view.name);
    // if (view.name === "create") {
    //   setChangeNavBar(1);
    // }
  }, [view])

  useEffect(() => {

    axios.get(`/api/getAllSongsHome`)
      .then((res) => {
        console.log("Data from deployed DB: ", res.data);
        setSongAllHomeData(res.data);
      })
      .catch((err) => console.log(err));
  }, [])

  // Keeping commented out code for potential props handling in the future
  // const changeView = (name, someProps = {}) => {
  const changeView = (name) => {
    setView({ name });
    // return (moreProps = {}) => {
    //   console.log("Changing view to: " + name);
    //   setView({ name, viewProps: { ...someProps, ...moreProps } });
    // };
  };

  const handleSetArtistSongData = (artistData, songData) => {
    console.log(artistData, songData);
    setArtistData(artistData);
    setSongData(songData);
  }

  const handleSetUser = (data) => {
    setUser(data);
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
            setUser({});
            return axios.get(`api/user/?userEmail=${res.data.email}`)
          })
          .then(async (res) => {
            let keys = Object.keys(res.data)
            if (keys.length === 0) {
              setView({ name: 'newAccount' });
            } else {
              setLoggedIn(true);
              setProfileData(res.data);
              setView({ name: 'home' });
            }
          })
          .then(() => {
            axios.get('/addCookie')
              .then(res => console.log(res))
              .catch(err => console.log(err));

            axios.get('getCookie')
            .then(res => console.log(res))
            .catch(err => console.log(err));
          })
          .catch((err) => console.log('error in oauth', err));
      }
    },
    [user]
  );

  const renderView = () => {
    switch (view.name) {
      case "home":
        return <Home songs={songAllHomeData} changeView={changeView} handleSetArtistSongData={handleSetArtistSongData} />;
      // case "discover":
      //   return <Discover changeView={changeView} />;
      case "create":
        return <Create changeView={changeView} collaborateSongPath={collaborateSongPath} />;
      case "favorites":
        return <Favorites changeView={changeView} />;
      case "newAccount":
        return <NewAccount changeView={changeView} profileData={profileData} setProfileData={setProfileData} setLoggedIn={setLoggedIn} />;
      case "profile":
        return <ArtistProfile changeView={changeView} artistData={artistData} profileData={profileData} loggedIn={loggedIn} />;
      case "play":
        return <Play changeView={changeView} songData={songData} setCollaborateSongPath={setCollaborateSongPath} />;
      case "myReleasedMusic":
        return <MyReleasedMusic changeView={changeView} />;
      case "confirmLogOut":
        return <ConfirmLogOut changeView={changeView} setProfileData={setProfileData} setLoggedIn={setLoggedIn} />;
      case "confirmDeleteAccount":
        return <ConfirmDeleteAccount />;
      case "theme":
        return <ThemeExample />;
      default:
        return <FourOhFour />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {<TopBar setUser={handleSetUser} changeView={changeView} profileData={profileData} setArtistData={setArtistData} loggedIn={loggedIn}/>}
      <Container id='main-app-container' maxWidth={'sm'} sx={{ padding: 0 }}>
        <Suspense fallback={<p>Loading...</p>}>{renderView()}</Suspense>
      </Container>
      {<NavBar changeView={changeView} />}
    </ThemeProvider>
  );
}
