import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu, AccountCircle, Edit, ExitToApp, MusicNote, Delete } from '@material-ui/icons';

export default function TopBar({ imageUrl }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <Avatar alt="Profile Picture" />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><Edit /></ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><MusicNote /></ListItemIcon>
              <ListItemText primary="My Music" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><Delete /></ListItemIcon>
              <ListItemText primary="Delete Account" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}



export default function TopBar({ imageUrl }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Avatar alt="Profile Picture" />
      </Toolbar>
    </AppBar>
  );
}