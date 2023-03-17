import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import PlayViewWaveform from './PlayViewWaveform.jsx';

export default function Play(props) {

  // const handleClosePlayView = (event) => {
  //   event.stopPropagation();
  //   props.handleClose();
  // }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      // width: '100%',
      // height: '100%',
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '5px',
        backgroundImage: `url(${props.artistImageUrl})`,
        padding: '20px',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'auto'
      }}>
        {/* <div style={{ fontSize: '24px', color: 'black' }}>Play View</div> */}
        <PlayViewWaveform trackUrl={props.trackUrl} handleClose={props.handleClose} />
        <div>{props.title}</div>
        <div>{props.artist}</div>
        <div>{"Favorited: " + props.likedCount}</div>
        <div>{"PlayCount: " + props.playCount}</div>
        {/* <button onClick={handleClosePlayView}>Back Arrow</button> */}
      </div>
    </div>
  );
}