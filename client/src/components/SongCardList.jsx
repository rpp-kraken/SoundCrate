import React from 'react';
import SongCard from './SongCard.jsx';

// export default function SongCardList({ songs }) {
export default function SongCardList({ songs, handleSetArtistSongData, changeView }) {
  // song: { title, time, artist, artistImageUrl, isLiked, likedCount, playCount }
  return (
    <div className="songCardList">
      {songs.map((song, i) => {
       {console.log(song)}
        return (
          <SongCard
            title={song.title}
            artist={song.user_id}
            path_to_song={song.path_to_song}
            artistImageUrl={song.path_to_artwork}
            likedCount={song.fav_count}
            play_count={song.play_count}
            key={i}
            handleSetArtistSongData={handleSetArtistSongData}
            changeView={changeView} />
        )
      })}
    </div>
  );
}