import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCardList from './SongCardList.jsx';
import Search from './Search.jsx';

export default function Discover() {
  // query the database for the first ten songs
  // for now, just use dummy data
  return (
    <div className="discover">
      <Search />
      <SongCardList />
    </div>
  )
}