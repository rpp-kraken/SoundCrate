import React from 'react';
import SongCard from './SongCard.jsx';

export default function SongCardList({ songs }) {
  // song: { title, time, artist, artistImageUrl, isLiked, likedCount, playCount }
  return (
    <div className="songCardList">
      {songs.map((song, i) => {
        return (
          <SongCard
            title={song.title}
            artist={song.user_id}
            artistImageUrl={song.path_to_artwork}
            likedCount={song.fav_count}
            playCount={song.play_count}
            key={i} />
        )
      })}
    </div>
  );
}