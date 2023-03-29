import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

export default function ConfirmLogOut({ changeView, setProfileData, setLoggedIn }) {
  const handleLogout = () => {
    setProfileData({})
    setLoggedIn(false);
    changeView('splash');
  }

  const handleCancel = () => {
    changeView('home');
  }

  return (
    <div>
      <h3>Are you sure you want to log out?</h3>
      <Button variant="contained" component="label">
        Yes
        <input type="submit" onClick={handleLogout} style={{ display: 'none' }}/>
      </Button>
      <Button variant="contained" component="label">
        No
        <input type="submit" onClick={handleCancel} style={{ display: 'none' }}/>
      </Button>
    </div>
  );
}