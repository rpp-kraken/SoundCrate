import React, { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export default function Search({setSearchQuery}) {
  return (
    <form className="searchbar" style={{ position: 'relative', margin: '15px' }} >
      <TextField
        id="search-bar"
        className="search-bar-text"
        onInput={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        placeholder="Search..."
        size="small"
        data-testid="searchBar"
        style={{  width: '100%' }}
      />
      <IconButton type="submit" aria-label="search" style={{ position: 'absolute', right: '5px' }}>
        <SearchIcon style={{ fill: 'gray' }} />
      </IconButton>
    </form>
    // <input type="text" placeholder="Search..."></input>
  );
}