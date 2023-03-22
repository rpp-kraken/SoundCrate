import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu, AccountCircle, Edit,  ExitToApp, MusicNote, Delete } from '@material-ui/icons';
import LoginIcon from '@mui/icons-material/Login';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Login from '../components/login/Login.jsx';
// import logo from '../../dist/name-and-icon-white.PNG';

// export default function TopBar({ imageUrl }) {
export default function TopBar({setUser, imageURL, changeView}) {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const onClickMyAccount = (event) => {
    changeView('profile');
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
          <Avatar alt="Profile Picture" style={{ height: '50px', width: '50px' }} />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem button>
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <Login setUser={setUser}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><Edit /></ListItemIcon>
              <ListItemText primary="Edit Profile" onClick={onClickMyAccount} />
            </ListItem>
            <ListItem button>
              <ListItemIcon><MusicNote /></ListItemIcon>
              <ListItemText primary="My Music" onClick={onClickMyMusic}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary="Log Out" onClick={onClickLogOut}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon><Delete /></ListItemIcon>
              <ListItemText primary="Delete Account" onClick={onClickDeleteAccount} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}