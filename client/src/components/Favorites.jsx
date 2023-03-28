import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCardList from './SongCardList.jsx';

export default function Favorites(props) {
  const [songs, setSongs] = useState();
  const [loading, setLoading] = useState(true);
  <div>
  <video autoPlay muted className="video" >
    <source src="snarkyFavoritesSplash.mp4" type="video/mp4" />
    Ouch! Sorry, your browser doesnt support this video! Get logged in to have some fun!
  </video>
</div>
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
    <div className="discover" >
      {loading
        ?
        <div>
        <video autoPlay muted className="video" >
          <source src="snarkyFavoritesSplash.mp4" type="video/mp4" />
          Ouch! Sorry, your browser doesnt support this video! Get logged in to have some fun!
        </video>
      </div>
        : <SongCardList songs={songs} />}
    </div>
  );
};