import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCardList from './SongCardList.jsx';
import Search from './Search.jsx';
// import { songData } from '../../../DummyData/dummyData.js';

const filterData = (query, data) => {
  return !query ? data : data.filter((d) => {
    return d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.user_id.toLowerCase().includes(query.toLowerCase())
  });
}

export default function Home(props) {
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   // console.log("PropsSongs: ");
  // }. [])

  let songs = filterData(searchQuery, props.songs);
  return (
    <div className="discover">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SongCardList songs={songs} changeView={props.changeView} handleSetArtistSongData={props.handleSetArtistSongData} profileData={props.profileData} view={props.view}/>
      <br/><br/><br/>
    </div>
  )
}
