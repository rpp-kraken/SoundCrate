import React, { useState, useEffect } from 'react';
import { Typography, Card, TableCell, Button  } from '@mui/material';
import { Avatar } from '@material-ui/core';
import { useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


export default function Profile({profileData}) {
  const theme = useTheme();
  const gridItemStyle={
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center'
  }
  return (
    <Box id='profile-header' sx={{ width: '100%'}}>
      <Grid container direction='column' spacing={0} p={4} sx={{ backgroundColor: '#000000', height: '45vh', paddingTop: '70px' }}>

        <Grid item xs={12} style={ gridItemStyle }>
          <Avatar alt="Profile Picture" src={profileData.picture} style={{ height: '100px', width: '100px' }}/>
        </Grid>

        <Grid item xs={12} style={ gridItemStyle }>
          <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>Artist Name</Typography>
        </Grid>

        <Grid container direction='col' style={{ ...gridItemStyle, fontSize: '12px' }}>

          <Grid item xs={12} style={ gridItemStyle }>
            <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>@ArtistTag</Typography>
          </Grid>

          <Grid item xs={12} style={ gridItemStyle }>
            <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>~Some bio here~</Typography>
          </Grid>

        </Grid>

        <Grid container direction='row' style={{ ...gridItemStyle, fontSize: '12px' }}>

          <Grid item xs={3} style={ gridItemStyle }>
            <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>Song</Typography>
          </Grid>

          <Grid item xs={3} style={ gridItemStyle }>
            <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>Favorites</Typography>
          </Grid>

        </Grid>
        <Grid item xs={12} style={ gridItemStyle }>
          <Button>Edit Profile</Button>
        </Grid>
      </Grid>
    </Box>
  );
}