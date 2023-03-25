import React, { useState, useEffect } from 'react';
import { Typography, Card, TableCell, Button } from '@mui/material';
import { Avatar } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import SongCardList from './SongCardList.jsx';

export default function ArtistProfile({ artistData, changeView, loggedIn, songData, profileData, handleSetArtistSongData }) {
  const theme = useTheme();
  const gridItemStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const onClickBackToHome = (event) => {
    changeView('home');
  };

  const handleEditProfile = () => {
    console.log('clicked to edit profile');
  }

  return (
    <Box id='profile-header' sx={{ width: '100%' }} p={0}>
      <Grid container direction='column' spacing={0} p={4} sx={{ backgroundColor: '#000000', height: 'fit-content' }}>

        <Grid item xs={12} sx={{ ...gridItemStyle }}>
          <Avatar alt="Profile Picture" src={artistData.path_to_pic} style={{ height: '100px', width: '100px' }} />
        </Grid>

        <Grid item xs={12} sx={{ ...gridItemStyle }}>
          <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>{artistData.name}</Typography>
        </Grid>

        <Grid container direction='col' style={{ ...gridItemStyle, fontSize: '12px' }}>

          <Grid item xs={12} sx={{ ...gridItemStyle }}>
            <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>@{artistData.username}</Typography>
          </Grid>

          <Grid item xs={12} sx={{ ...gridItemStyle }}>
            <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>{artistData.bio}</Typography>
          </Grid>

        </Grid>

        <Grid container direction='row' style={{ ...gridItemStyle, fontSize: '12px', marginTop: '10px' }}>

          <Grid item sx={{ ...gridItemStyle, flexDirection: 'column', minWidth: '80px' }}>
            <Typography variant='bodyText' style={{ textAlign: 'center' }}>{artistData.songCount}</Typography>
            <Typography variant='bodyText' style={{ textAlign: 'center' }}>Song</Typography>
          </Grid>
          <div style={{ boxSizing: 'border-box', borderLeft: '1px solid gray', height: '15px' }}></div>
          <Grid item sx={{ ...gridItemStyle, flexDirection: 'column', minWidth: '80px' }}>
            <Typography variant='bodyText' style={{ textAlign: 'center' }}>{artistData.favoritesCount}</Typography>
            <Typography variant='bodyText' style={{ textAlign: 'center' }}>Favorites</Typography>
          </Grid>

        </Grid>

        {(loggedIn && artistData.username === profileData.username) && <Grid item xs={12} sx={{ ...gridItemStyle }}>
            <Button variant="contained" component="label">
              Edit Profile
              <input type="submit" onClick={() => handleEditProfile()} style={{ display: 'none' }} />
            </Button>
          </Grid>}

      </Grid>
      {
      artistData.songs ?
      <SongCardList songs={artistData.songs} handleSetArtistSongData={handleSetArtistSongData} changeView = {changeView} /> :
      null
      }
    </Box>
  );
}