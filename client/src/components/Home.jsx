import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCardList from './SongCardList.jsx';
import Search from './Search.jsx';

const filterData = (query, data) => {
  return !query ? data : data.filter((d) => {
    const keys = Object.keys(d.tags);
    return d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.username.toLowerCase().includes(query.toLowerCase()) ||
      (keys[0] && keys[0].toLowerCase().includes(query.toLowerCase())) ||
      (keys[1] && keys[1].toLowerCase().includes(query.toLowerCase())) ||
      (keys[2] && keys[2].toLowerCase().includes(query.toLowerCase()))
  });
}

export default function Home(props) {
  const [searchQuery, setSearchQuery] = useState("");

  let songs = filterData(searchQuery, props.songs);
  return (
    <div className="discover">
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
