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
import Profile from './Profile.jsx';
import MyReleasedMusic from './MyReleasedMusic.jsx';
import ConfirmLogOut from './ConfirmLogOut.jsx';
import ConfirmDeleteAccount from './ConfirmDeleteAccount.jsx';
import Play from './Play.jsx';
import Publish from './Publish.jsx';
import FourOhFour from './404.jsx';
import { songData } from '../../../DummyData/dummyData.js'

export default function App() {
  const views = ['profile', 'create', 'discover', 'play', 'publish', 'theme', 'songcard'];

  // Play View: For Testing our S3 Bucket
  const [listOfTracks, setListOfTracks] = useState(['https://soundcrate.s3.us-east-2.amazonaws.com/9308db8f-dbd0-4ca7-b236-eda4f4b56b11.m4a']);

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

  const renderView = () => {
    switch (view.name) {
      case "home":
        return <Home songs={songData} changeView={changeView} />;
      case "discover":
        return <Discover changeView={changeView} />;
      case "create":
        return <Create />;
      case "favorites":
        return <Favorites changeView={changeView}/>;
      case "profile":
        return <Profile changeView={changeView} />;
      case "myReleasedMusic":
        return <MyReleasedMusic changeView={changeView}/>;
      case "confirmLogOut":
        return <ConfirmLogOut />;
      case "confirmDeleteAccount":
        return <ConfirmDeleteAccount />;
      case "play":
        return <Play trackUrl={listOfTracks[0]} />;
      default:
        return <FourOhFour />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {view.name !== 'profile' && <TopBar changeView={changeView} />}
      {/* {view === 'profile' && <Profile />}
      {view === 'create' && <Create />}
      {view === 'discover' && <Discover songs={songData} />}
      {listOfTracks.map((trackUrl, i) => { return <Play trackUrl={trackUrl} index={i} key={i} /> })}
      {view === 'play' && <Play />}
      {view === 'publish' && <Publish />}
      {view === 'theme' && <ThemeExample />}
      {view === 'songcard' && <SongCard />}
      {view !== 'profile' && <NavBar />} */}
      <main>
        <Suspense fallback={<p>Loading...</p>}>{renderView()}</Suspense>
      </main>
      {view.name !== 'profile' && <NavBar changeView={changeView} />}
    </ThemeProvider>
  );
}