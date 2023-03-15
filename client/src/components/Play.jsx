import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import PlayViewWaveform from './PlayViewWaveform.jsx';

export default function Play(props) {
  return (
    <div>
      <h3>Play View</h3>
      <PlayViewWaveform trackUrl={props.trackUrl}/>
    </div>
  );
}