import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, Search, Person } from '@material-ui/icons';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useTheme } from '@mui/material/styles';

export default function NavBar(props) {
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      id="navBar"
      value={value}
      onChange={(event, newValue) => {
        // console.log("Nav Bar - newValue:", newValue);
        setValue(newValue);
        if (newValue === 0) {
          props.changeView('home');
        } else if (newValue === 1) {
          props.changeView('create');
        } else if (newValue === 2) {
          props.changeView('favorites');
        }
      }}
      showLabels
      style={{ backgroundColor: '#0A0F12', position: 'fixed', bottom: 0, width: '100%', height: '10vh' }}
    >
      <BottomNavigationAction label="" icon={<Home />} />
      <BottomNavigationAction label="" icon={<KeyboardVoiceIcon />} />
      <BottomNavigationAction label="" icon={<FavoriteIcon />} />
    </BottomNavigation>
  );
}
