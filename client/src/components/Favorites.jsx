import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

export default function Favorites(props) {
  console.log('these are the fav props: ', props);
  const [songs, setSongs] = useState();
  useEffect(() => {
    fetch(`http://localhost:3000/api/getFavoriteSongs?user=${encodeURIComponent(props.profileData.name)}`)
      .then(res => {
        if (!res.ok) {
          throw 'There was a problem retrieving the user\'s favorite songs';
        }
        return res.json();
      })
      .then(songs => {
        console.log(songs);
        setSongs(songs);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.profileData.name]);
  return (
    <div>
      <h3>Favorites view - list of user's favorited songs</h3>
    </div>
  );
}