import React from 'react';
import SongCard from './SongCard.jsx';


export default function SongCardList({ songs, handleSetArtistSongData, changeView, profileData, view }) {
  return (
    <div className="songCardList">
      {songs.map((song, i) => {
        const tags = Object.values(song.tags).map((tagObj) => {
          return tagObj.name;
        })

        return (
          <SongCard
            title={song.title}
            user_id={song.user_id}
            artist={song.username}
            path_to_song={song.path_to_song}
            artistImageUrl={song.path_to_artwork}
            likedCount={song.fav_count}
            play_count={song.play_count}
            songID={song.id}
            id={song.song_id}
            tags={tags}
            key={i}
            handleSetArtistSongData={handleSetArtistSongData}
            changeView={changeView}
            profileData={profileData}
            view={view}
            />
        )
      })}
    </div>
  );
}