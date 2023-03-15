import React from 'react';
import SongCard from './SongCard.jsx';

export default function SongCardList({ songs }) {
  // song: { title, time, artist, artistImageUrl, isLiked }
  return (
    <div className="songCardList">
      {songs.map((song, i) => <SongCard song={song} key={i} />)}
    </div>
  );
}