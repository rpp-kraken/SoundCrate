import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCardList from './SongCardList.jsx';

export default function MyReleasedMusic(props) {
  const [songs, setSongs] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:3000/api/songs?user=${encodeURIComponent(props.profileData.name)}`)
      .then(res => {
        if (!res.ok) {
          throw 'There was a problem retrieving the user\'s songs';
        }
        return res.json();
      })
      .then(songs => {
        setSongs(songs);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.profileData.name]);
  return (
    <div>
      {loading
        ? <p>Loading...</p>
        : <SongCardList songs={songs} changeView={props.changeView} handleSetArtistSongData={props.handleSetArtistSongData} />}
    </div>
  );
};