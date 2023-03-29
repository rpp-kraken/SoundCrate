import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu, AccountCircle, Edit, ExitToApp, MusicNote, Delete } from '@material-ui/icons';
import LoginIcon from '@mui/icons-material/Login';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';
import Login from '../components/login/Login.jsx';

export default function TopBar({ setUser, imageURL, changeView, profileData, handleSetArtistSongData, loggedIn }) {
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const onClickMyAccount = (event) => {
    handleSetArtistSongData(profileData.username);
  };
  const onClickMyMusic = (event) => {
    changeView('myReleasedMusic');
  };
  const onClickLogOut = (event) => {
    changeView('confirmLogOut');
  };
  const onClickDeleteAccount = (event) => {
    changeView('confirmDeleteAccount');
  };


  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: theme.palette.background.secondary, height: '16vh', justifyContent: 'center', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} data-testid="drawer">
            <Menu />
          </IconButton>
          <Avatar alt="Profile Picture" src={profileData.path_to_pic} style={{ height: '50px', width: '50px' }} />
          <Box
            component="img"
            sx={{
              width: 300,
              maxWidth: { xs: 200, md: 250 },
            }}
            alt="Sound Crate logo"
            src="/images/name-and-icon-white.png"
          />
        </Toolbar>

      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {!loggedIn && <ListItem button>
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <Login setUser={setUser} />
            </ListItem>}
            {loggedIn && <ListItem button>
              <ListItemIcon><Edit /></ListItemIcon>
              <ListItemText primary="My Account" onClick={onClickMyAccount} />
            </ListItem>}
            {loggedIn && <ListItem button>
              <ListItemIcon><MusicNote /></ListItemIcon>
              <ListItemText primary="My Music" onClick={onClickMyMusic} />
            </ListItem>}
            {loggedIn && <ListItem button>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary="Log Out" onClick={onClickLogOut} />
            </ListItem>}
            {loggedIn && <ListItem button>
              <ListItemIcon><Delete /></ListItemIcon>
              <ListItemText primary="Delete Account" onClick={onClickDeleteAccount} />
            </ListItem>}
          </List>
        </div>
      </Drawer>
    </>
  );
}