import React, { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export default function Search({setSearchQuery}) {
  return (
    <form className="searchbar">
      <TextField
        id="search-bar"
        className="search-bar-text"
        onInput={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        placeholder="Search..."
        size="small"
        data-testid="searchBar"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </form>
    // <input type="text" placeholder="Search..."></input>
  );
}