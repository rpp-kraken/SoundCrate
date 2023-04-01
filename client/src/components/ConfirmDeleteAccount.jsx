import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { Typography, Card, TableCell, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';


export default function ConfirmDeleteAccount(props) {
  const { changeView, profileData, setProfileData, setLoggedIn } = props;
  const handleDelete = async () => {
    await axios.delete(`/api/deleteUser?userId=${profileData.id}`)
      .catch(err => console.log(`error deleting user with id ${profileData.id}`, err));
    setLoggedIn(false);
    setProfileData({});
    changeView('splash');
  }

  const handleCancel = () => {
    changeView('home');
  }

  const gridItemStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div>
      <br />
      <h3 style={{ textAlign: 'center', margin: '10px' }}>Are you sure you want to delete your account?</h3>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 'fit-content', marginBottom: '110px', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container direction='row' spacing={7} p={4} sx={{ flexDirection: 'row', height: 'fit-content' }}>

          <Grid item xs={12} sx={{ ...gridItemStyle, flexDirection: 'row' }}>
            <Button variant="contained" component="label">
              Yes
              <input type="submit" onClick={handleDelete} style={{ display: 'none' }} />
            </Button>
          </Grid>

          <Grid item xs={12} sx={{ ...gridItemStyle, flexDirection: 'row' }}>
            <Button variant="contained" component="label">
              No
              <input type="submit" onClick={handleCancel} style={{ display: 'none' }} />
            </Button>
          </Grid>

        </Grid>
      </Box >
    </div >
  );
}