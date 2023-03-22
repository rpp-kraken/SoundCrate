import React, { useState, useEffect } from 'react';
import { Typography, Card, TableCell, Button } from '@mui/material';
import { Avatar } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


export default function ProfileOtherArtist(props) {
  const theme = useTheme();
  const gridItemStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const onClickBackToHome = (event) => {
    event.stopPropagation();
    props.handleClose();
  };

  return (

    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: '#3f3981',
        borderRadius: '5px',
        padding: '0px',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'auto'
      }}>
        <Box id='profile-header' sx={{ width: '100%' }}>
          <Grid container direction='column' spacing={0} p={4} sx={{ backgroundColor: '#000000', height: '45vh', paddingTop: '70px' }}>

            <Grid item xs={12} style={gridItemStyle}>
              <Avatar alt="Profile Picture" style={{ height: '100px', width: '100px' }} />
            </Grid>

            <Grid item xs={12} style={gridItemStyle}>
              <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>{props.artist}</Typography>
            </Grid>

            <Grid container direction='col' style={{ ...gridItemStyle, fontSize: '12px' }}>

              <Grid item xs={12} style={gridItemStyle}>
                <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>@{props.artist}</Typography>
              </Grid>

              <Grid item xs={12} style={gridItemStyle}>
                <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>~Some bio here~</Typography>
              </Grid>

            </Grid>

            <Grid container direction='row' style={{ ...gridItemStyle, fontSize: '12px' }}>

              <Grid item xs={3} style={gridItemStyle}>
                <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>Song</Typography>
              </Grid>

              <Grid item xs={3} style={gridItemStyle}>
                <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>Favorites</Typography>
              </Grid>

            </Grid>
            <Grid item xs={12} style={ gridItemStyle }>
          <Button onClick={onClickBackToHome}>Back Arrow</Button>
        </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}