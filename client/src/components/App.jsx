import React, { useState, useEffect, Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import theme from '../themes/default.jsx';
import ThemeExample from './ThemeExample.jsx';
import TopBar from './TopBar.jsx';
import Home from './Home.jsx'
import Create from './Create.jsx';
import Favorites from './Favorites.jsx';
import Discover from './Discover.jsx'
import NavBar from './NavBar.jsx';
import NewAccount from '../components/login/NewAccount.jsx';
import Profile from './Profile.jsx';
import MyReleasedMusic from './MyReleasedMusic.jsx';
import ConfirmLogOut from './ConfirmLogOut.jsx';
import ConfirmDeleteAccount from './ConfirmDeleteAccount.jsx';
// import Play from './Play.jsx';
// import Publish from './Publish.jsx';
import FourOhFour from './404.jsx';
import { songData } from '../../../DummyData/dummyData.js'
import axios from 'axios';

export default function App() {
  const [ user, setUser ] = useState([]);
  const [ profileData, setProfileData ] = useState([]);
  // const views = ['profile', 'create', 'discover', 'play', 'publish', 'theme', 'songcard'];

  // View State changes on click
  const [view, setView] = useState({ name: 'home' });

  useEffect(() => {
    console.log("Changing view to: " + view.name);
  }, [view])

  // Keeping commented out code for potential props handling in the future
  // const changeView = (name, someProps = {}) => {
  const changeView = (name) => {
    setView({ name });
    // return (moreProps = {}) => {
    //   console.log("Changing view to: " + name);
    //   setView({ name, viewProps: { ...someProps, ...moreProps } });
    // };
  };

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
                setView({name: 'newAccount'});
            })
            .catch((err) => console.log(err));
        }
    },
    [ user ]
  );

  const renderView = () => {
    switch (view.name) {
      case "home":
        return <Home songs={songData} changeView={changeView} />;
      // case "discover":
      //   return <Discover changeView={changeView} />;
      case "create":
        return <Create />;
      case "favorites":
        return <Favorites changeView={changeView}/>;
      case "newAccount":
        return <NewAccount changeView={changeView} profileData={profileData}/>;
      case "profile":
        return <Profile changeView={changeView} profileData={profileData}/>;
      case "myReleasedMusic":
        return <MyReleasedMusic changeView={changeView}/>;
      case "confirmLogOut":
        return <ConfirmLogOut />;
      case "confirmDeleteAccount":
        return <ConfirmDeleteAccount />;
      default:
        return <FourOhFour />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {view.name !== 'profile' && <TopBar setUser={handleSetUser} changeView={changeView} profileData={profileData}/>}
      <main>
        <Suspense fallback={<p>Loading...</p>}>{renderView()}</Suspense>
      </main>
      {view.name !== 'profile' && <NavBar changeView={changeView} />}
    </ThemeProvider>
  );
}
