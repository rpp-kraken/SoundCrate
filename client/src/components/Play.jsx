import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import PlayViewWaveform from './PlayViewWaveform.jsx';

export default function Play(props) {
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
        padding: '20px',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'auto'
      }}>
      <div style={{ fontSize: '24px', color: 'black' }}>Play View</div>
        <PlayViewWaveform trackUrl={props.trackUrl} />
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
}