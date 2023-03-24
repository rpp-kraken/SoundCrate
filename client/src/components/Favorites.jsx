import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCardList from './SongCardList.jsx';

export default function Favorites(props) {
  console.log('these are the fav props: ', props);
  const [songs, setSongs] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:3000/api/getFavoriteSongs?user=${encodeURIComponent(props.profileData.name)}`)
      .then(res => {
        if (!res.ok) {
          throw 'There was a problem retrieving the user\'s favorite songs';
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
        : <SongCardList songs={songs} />}
    </div>
  );
};