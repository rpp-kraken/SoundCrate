import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, Search, Person } from '@material-ui/icons';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

export default function NavBar() {
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      id="navBar"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="" icon={<Home />} />
      <BottomNavigationAction label="" icon={<KeyboardVoiceIcon />} />
      <BottomNavigationAction label="" icon={<FavoriteIcon />} />
    </BottomNavigation>
  );
}