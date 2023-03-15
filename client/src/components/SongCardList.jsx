import React from 'react';
import SongCardContainer from './SongCard.jsx';

export default function SongCardList({ songs }) {
  // song: { title, time, artist, artistImageUrl, isLiked }
  return (
    <div className="songCardList">
      {songs.map((song, i) => <SongCardContainer song={song} key={i} />)}
    </div>
  );
}