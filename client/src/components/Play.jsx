import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import PlayViewWaveform from './PlayViewWaveform.jsx';
import axios from 'axios';
import { Typography, Card, TableCell, Button, IconButton } from '@mui/material';
import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function Play(props) {
  const theme = useTheme();

  useEffect(() => {
    axios.put('/api/playCountIncrement', { id: props.songData.id })
      .then((res) => {
        console.log("PLAY INCREMENT SUCCESS! Data from deployed DB: ", res.data);
      })
      .catch((err) => console.log(err));
  }, [])

  const handleCollab = (event) => {
    event.stopPropagation();
    props.setCollaborateSongPath(props.songData.path_to_song);
    props.changeView('create');
  }

  return (
    <div>
      <div style={{
        borderRadius: '5px',
        // backgroundImage: `url(${props.songData.artistImageUrl})`,
        padding: '20px',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        // maxHeight: '100%',
        maxHeight: '100vh',
        overflow: 'auto'
      }}>
        {/* <div style={{ fontSize: '24px', color: 'black' }}>Play View</div> */}
        <PlayViewWaveform trackUrl={props.songData.path_to_song} trackTitle={props.songData.title} />
        {/* <div>{"Song Title: " + props.songData.title}</div> */}
        {/* <Grid container spacing={1} p={4} sx={{ backgroundColor: theme.palette.background.default, flexDirection: 'column', alignItems: 'center', maxWidth: '300px', minWidth: '300px' }}>
          <Typography color="secondary" variant='bodyText' sx={{ width: '100%', textAlign: 'center', color: 'white' }}>{"Artist Name: " + props.songData.artist}</Typography>
        </Grid>
        <Grid container spacing={1} p={1} sx={{ backgroundColor: theme.palette.background.default, flexDirection: 'column', alignItems: 'center', maxWidth: '300px', minWidth: '300px' }}>
          <Typography color="secondary" variant='bodyText' sx={{ width: '100%', textAlign: 'center', color: 'white' }}>{"# " + props.songData.tags}</Typography>
        </Grid>
        <Grid container spacing={1} p={1} sx={{ backgroundColor: theme.palette.background.default, flexDirection: 'column', alignItems: 'center', maxWidth: '300px', minWidth: '300px' }}>
          <Typography color="secondary" variant='bodyText' sx={{ width: '100%', textAlign: 'center', color: 'white' }}>{"Favorited: " + props.songData.likedCount}</Typography>
        </Grid>
        <Grid container spacing={1} p={1} sx={{ backgroundColor: theme.palette.background.default, flexDirection: 'column', alignItems: 'center', maxWidth: '300px', minWidth: '300px' }}>
          <Typography color="secondary" variant='bodyText' sx={{ width: '100%', textAlign: 'center', color: 'white' }}>{"Play Count: " + props.songData.play_count}</Typography>
        </Grid> */}
        <div class="play-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: '20px' }}>
          <div class="play-text-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <div style={{ textAlign: 'center' }}>{"# " + props.songData.tags}</div>
            <div style={{ boxSizing: 'border-box', borderLeft: '1px solid gray', height: '15px' }}></div>
            <div style={{ textAlign: 'center' }}>{"Favorited: " + props.songData.likedCount}</div>
            <div style={{ boxSizing: 'border-box', borderLeft: '1px solid gray', height: '15px' }}></div>
            <div style={{ textAlign: 'center' }}>{"Play Count: " + props.songData.play_count}</div>
          </div>
          <Button onClick={handleCollab} style={{ margin: '10px auto' }}>Collaborate</Button>
        </div>
      </div>
    </div>
  );
}