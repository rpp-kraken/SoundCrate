import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu, AccountCircle, Edit, ExitToApp, MusicNote, Delete } from '@material-ui/icons';
import { useTheme } from '@mui/material/styles';
import Login from '../components/login/Login.jsx';

export default function TopBar({ imageUrl }) {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: theme.palette.background.secondary, height: '16vh', justifyContent: 'center', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <Avatar alt="Profile Picture"  style={{ height: '50px', width: '50px' }}/>
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
              <Login />
            </ListItem>
            <ListItem>
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="My Account" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><Edit /></ListItemIcon>
              <ListItemText primary={<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Edit Profile</a>} />
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