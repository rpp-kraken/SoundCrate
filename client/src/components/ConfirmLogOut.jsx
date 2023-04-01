import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { Typography, Card, TableCell, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function ConfirmLogOut({ changeView, setProfileData, setLoggedIn }) {
  const handleLogout = () => {
    setProfileData({})
    setLoggedIn(false);
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
      <h3 style={{ textAlign: 'center', margin: '10px' }}>Are you sure you want to log out?</h3>
      <Box sx={{ width: '100%' }} p={0}>
        <Grid container direction='row' spacing={7} p={4} sx={{ flexDirection: 'row', height: 'fit-content' }}>

          <Grid item xs={12} sx={{ ...gridItemStyle, flexDirection: 'row' }}>
            <Button variant="contained" component="label">
              Yes
              <input type="submit" onClick={handleLogout} style={{ display: 'none' }} />
            </Button>
          </Grid>

          <Grid item xs={12} sx={{ ...gridItemStyle, flexDirection: 'row' }}>
            <Button variant="contained" component="label">
              No
              <input type="submit" onClick={handleCancel} style={{ display: 'none' }} />
            </Button>
          </Grid>

        </Grid>
      </Box>
    </div>
  );
}