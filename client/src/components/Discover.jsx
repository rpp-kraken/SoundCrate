import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCard from './SongCard.jsx'

export default function Discover(props) {
  return (
    <div>
      <h3>Discover view</h3>
      {console.log(props)}
      {props.songs.map((song, i) => {
        return (
          <SongCard
            key={i}
            title={song.title}
            playCount={song.play_count}
            artistImageUrl={song.path_to_artwork}
            artist={song.user_id}
            likedCount={song.fav_count}
          />
        )
      })}
    </div>
  );
}