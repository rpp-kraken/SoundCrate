import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';


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