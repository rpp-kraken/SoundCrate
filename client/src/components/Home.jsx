// import React, { useState, useEffect } from 'react';
// import { createTheme } from '@mui/material/styles';
// import Discover from './Discover.jsx'

// export default function Home(props) {

//   const [searchBarIsClicked, setSearchBarIsClicked] = useState(false);

//   const onClickDiscover = (event) => {
//     // setSearchBarIsClicked(true);
//     props.changeView('discover');
//   };

//   return (
//     <div>
//       <div onClick={onClickDiscover}>
//         search bar on top... click to open discover view
//       </div>
//       <h3>Home view - init is list of most popular songs on App - favorite count or playcount?</h3>
//       {/* {console.log(props)} */}
//       {/* {searchBarIsClicked && <Discover/> } */}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';
import SongCardList from './SongCardList.jsx';
import Search from './Search.jsx';
import { songData } from '../../../DummyData/dummyData.js';

const filterData = (query, data) => {
  return !query ? data : data.filter((d) => {
    return d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.user_id.toLowerCase().includes(query.toLowerCase())
  });
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  // query the database for the first ten songs
  // for now, just use dummy data
  let songs = filterData(searchQuery, songData);
  return (
    <div className="discover">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SongCardList songs={songs} />
    </div>
  )
}