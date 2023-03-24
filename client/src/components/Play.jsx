import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import PlayViewWaveform from './PlayViewWaveform.jsx';
import axios from 'axios';

export default function Play(props) {
  // const handleClosePlayView = (event) => {
  //   event.stopPropagation();
  //   props.handleClose();
  // }

  useEffect(() => {
    // console.log("props.songData.id: ", props.songData.id);
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
        <PlayViewWaveform trackUrl={props.songData.path_to_song} />
        <div>{props.songData.title}</div>
        <div>{props.songData.artist}</div>
        <div>{"Favorited: " + props.songData.likedCount}</div>
        <div>{"PlayCount: " + props.songData.play_count}</div>
        {/* <button onClick={handleClosePlayView}>Back Arrow</button> */}
        <button onClick={handleCollab}>Collaborate</button>
      </div>
    </div>
  );
}