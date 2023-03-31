import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCardList from './SongCardList.jsx';
import Search from './Search.jsx';

const filterData = (query, data) => {
  return !query ? data : data.filter((d) => {
    return d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.user_id.toLowerCase().includes(query.toLowerCase())
  });
}

export default function Home(props) {
  const [searchQuery, setSearchQuery] = useState("");

  let songs = filterData(searchQuery, props.songs);
  return (
    <div className="discover">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {songs.length > 0 ? (
        <SongCardList songs={songs} changeView={props.changeView} handleSetArtistSongData={props.handleSetArtistSongData} profileData={props.profileData} view={props.view}/>
      ) : (
        <video autoPlay muted className="video" >
          <source src="noResults.mp4" type="video/mp4" />
          Ouch! Sorry, your browser doesnt support this video! Get logged in to have some fun!
        </video>
      )}
      <br/><br/><br/>
    </div>
  )
}
