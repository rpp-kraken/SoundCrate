import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCardListFavorites from './SongCardListFavorites.jsx';

export default function Favorites(props) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/getFavoriteSongs?user=${encodeURIComponent(props.profileData.name)}`)
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
      {songs.length === 0
        ?
        <div>
          <video autoPlay muted className="video" >
            <source src="snarkyFavoritesSplash.mp4" type="video/mp4" />
            Ouch! Sorry, your browser doesnt support this video! Get logged in to have some fun!
          </video>
        </div>
        : <SongCardListFavorites songs={songs} view={props.view.name} profileData={props.profileData} handleSetArtistSongData={props.handleSetArtistSongData} changeView={props.changeView} />}
    </div>
  );
};