import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCardList from './SongCardList.jsx';
import { songData } from '../../../DummyData/dummyDataMy.js'


export default function MyReleasedMusic(props) {
  const [songs, setSongs] = useState(songData);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading
        ? <p>Loading...</p>
        : <SongCardList songs={songs} changeView={props.changeView} handleSetArtistSongData={props.handleSetArtistSongData} />}
    </div>
  );
};