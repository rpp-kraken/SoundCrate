import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import PlayViewWaveform from './PlayViewWaveform.jsx';

export default function Play(props) {

  // const handleClosePlayView = (event) => {
  //   event.stopPropagation();
  //   props.handleClose();
  // }

  return (
    <div>
      <div style={{
        background: '#fff',
        borderRadius: '5px',
        backgroundImage: `url(${props.songData.artistImageUrl})`,
        padding: '20px',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'auto'
      }}>
        {/* <div style={{ fontSize: '24px', color: 'black' }}>Play View</div> */}
        <PlayViewWaveform trackUrl={props.songData.path_to_song} />
        <div>{props.songData.title}</div>
        <div>{props.songData.artist}</div>
        <div>{"Favorited: " + props.songData.likedCount}</div>
        <div>{"PlayCount: " + props.songData.play_count}</div>
        {/* <button onClick={handleClosePlayView}>Back Arrow</button> */}
      </div>
    </div>
  );
}