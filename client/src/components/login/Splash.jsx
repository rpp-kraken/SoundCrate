import React, { useState, useEffect } from 'react';


export default function Splash() {
  const youTubeStyle = {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: '0'
  }

  const iframeStyle = {
    left: '0',
    top: '0',
    height: '100%',
    width: '100%',
    position: 'absolute'
  }

  return (
    <div style={youTubeStyle}>
      {/* Google Drive */}
      <iframe style={iframeStyle} src="https://drive.google.com/file/d/1oHRFh7fYUlh9b_koh4WHqzYTkmm0pPf2/preview" width="640" height="480" allow="autoplay"></iframe>

      {/* YouTube */}
      {/* <iframe style={iframeStyle} width="560" height="315" src="https://www.youtube.com/embed/6hNn3_r_MT4?autoplay=1&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
    </div>
  );
}