import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import axios from 'axios';


export default function ConfirmDeleteAccount({ changeView, profileData, setProfileData, setLoggedIn }) {
  const handleDelete = async () => {
    await axios.delete(`/api/deleteUser?userId=${profileData.id}`)
    .catch(err => console.log(`error deleting user with id ${profileData.id}`, err));
    setLoggedIn(false);
    setProfileData({});
    console.log('yes please');
    changeView('splash');
  }

  const handleCancel = () => {
    console.log('no thanks');
    changeView('home');
  }

  return (
    <div>
      <h3>Are you sure you want to delete your account?</h3>
      <Button variant="contained" component="label">
        Yes
        <input type="submit" onClick={handleDelete} style={{ display: 'none' }}/>
      </Button>
      <Button variant="contained" component="label">
        No
        <input type="submit" onClick={handleCancel} style={{ display: 'none' }}/>
      </Button>
    </div>
  );
}