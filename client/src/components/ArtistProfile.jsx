import React, { useState, useEffect } from 'react';
import { Typography, Card, TableCell, Button } from '@mui/material';
import { Avatar } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import SongCardList from './SongCardList.jsx';
import EditProfile from './EditProfile.jsx';
import ArtistBadgeProfile from './ArtistBadgeProfile.jsx'
import axios from 'axios';

export default function ArtistProfile({ artistData, changeView, loggedIn, songData, profileData, handleSetArtistSongData }) {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  console.log(artistData)
  const theme = useTheme();
  const gridItemStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const onClickBackToHome = (event) => {
    changeView('home');
  };

  const onClickRequestVerification = (event) => {
    console.log("🚀 ~ file: ArtistProfile.jsx:25 ~ artistData.favoritesCount: ", artistData.favoritesCount)

    let bronze = 250000;
    let silver = 500000;
    let gold = 1000000;
    let tillNextTier, currentTier;

    const newTiers = {
      newTier: null,
      oldTier: null
    };


    if (artistData.favoritesCount >= bronze) {
      // tillNextTier = silver - likes;
      // currentTier = 'tier1';
      newTiers.newTier = "tier1";
    } else if (artistData.favoritesCount <= silver && artistData.favoritesCount >= gold) {
      // tillNextTier = gold - artistData.favoritesCount;
      // currentTier = 'tier2';
      newTiers.newTier = "tier2";
    } else if (artistData.favoritesCount >= gold) {
      // currentTier = 'tier3';
      newTiers.newTier = "tier3";
    }

    if (artistData.tier1) newTiers.oldTier = "tier1";
    if (artistData.tier2) newTiers.oldTier = "tier2";
    if (artistData.tier3) newTiers.oldTier = "tier3";

    console.log("🚀 ~ file: ArtistProfile.jsx:69 ~ onClickRequestVerification ~ newTiers:", newTiers)
    if (newTiers.newTier && newTiers.newTier !== newTiers.oldTier) {
      axios.put(`/api/editTier?userId=${artistData.id}`, newTiers)
        .then((result) => {
          console.log("TODO: Send get request to refresh the page for badge to show up ~ result:", result)
        })
        .catch((err) => console.log('error in verification request: ', err));
    } else {
      console.log("not eligible for tier verification")
    }

  };

  const handleEditProfile = () => {
    console.log('clicked to edit profile');
  }

  return (
    <Box id='profile-header' sx={{ width: '100%' }} p={0}>
      <Grid container direction='column' spacing={0} p={4} sx={{ backgroundColor: '#000000', height: 'fit-content' }}>

        <Grid item xs={12} sx={{ ...gridItemStyle }}>
          <Avatar alt="Profile Picture" src={artistData.path_to_pic} style={{ height: '100px', width: '100px' }} />
        </Grid>

        <Grid item xs={12} sx={{ ...gridItemStyle }}>
          <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>{artistData.name}</Typography>
        </Grid>

        <Grid container direction='col' style={{ ...gridItemStyle, fontSize: '12px' }}>

          <Grid item xs={12} sx={{ ...gridItemStyle }}>
            <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>@{artistData.username}</Typography>
          </Grid>

          <Grid item xs={12} sx={{ ...gridItemStyle }}>
            <Typography variant='bodyText' style={{ width: '100%', textAlign: 'center' }}>{artistData.bio}</Typography>
          </Grid>

        </Grid>

        <Grid container direction='row' style={{ ...gridItemStyle, fontSize: '12px', marginTop: '10px' }}>

          <Grid item sx={{ ...gridItemStyle, flexDirection: 'column', minWidth: '80px' }}>
            <Typography variant='bodyText' style={{ textAlign: 'center' }}>{artistData.songCount || 0}</Typography>
            <Typography variant='bodyText' style={{ textAlign: 'center' }}>Songs</Typography>
          </Grid>
          <div style={{ boxSizing: 'border-box', borderLeft: '1px solid gray', height: '15px' }}></div>
          <Grid item sx={{ ...gridItemStyle, flexDirection: 'column', minWidth: '80px' }}>
            <Typography variant='bodyText' style={{ textAlign: 'center' }}>{artistData.favoritesCount || 0}</Typography>
            <Typography variant='bodyText' style={{ textAlign: 'center' }}>Favorites</Typography>
          </Grid>
          {(artistData.tier1 || artistData.tier2 || artistData.tier3) &&
          <Grid item sx={{ ...gridItemStyle, flexDirection: 'column', minWidth: '80px' }}>
            <ArtistBadgeProfile tier1={artistData.tier1} tier2={artistData.tier2} tier3={artistData.tier3} />
          </Grid>
          }
        </Grid>

        {(loggedIn && artistData.username === profileData.username) && <Grid item xs={12} sx={{ ...gridItemStyle }}>
          <Button variant="contained" component="label" style={{ margin: '3px' }} >
            Edit Profile
            <input onClick={() => setOpenEditProfile(true)} style={{ display: 'none', margin: '3px' }} />
          </Button><br />
          <Button variant="contained" component="label" onClick={onClickRequestVerification} >
            Request Verification
          </Button>
          <div>
            {openEditProfile && <EditProfile setOpenEditProfile={setOpenEditProfile} profileData={profileData} />}      <br /><br />
          </div>
        </Grid>}

      </Grid>
      {
        artistData.songs ?
          <SongCardList songs={artistData.songs} handleSetArtistSongData={handleSetArtistSongData} changeView={changeView} /> :
          null
      }
    </Box>
  );
}