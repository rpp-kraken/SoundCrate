import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Play from './Play.jsx';
import ProfileOtherArtist from './ProfileOtherArtist.jsx';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  media: {
    // width: 120,
    width: 156.16,
    height: 'fill',
    objectFit: 'fill',
    // objectFit: 'cover',
    marginLeft: 'auto'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  subcontent: {
    display: 'flex',
    pl: 1,
    pb: 1
  }
});

export default function SongCard({ title, artist, path_to_song, artistImageUrl, isLiked, likedCount, play_count, handleSetArtistSongData, changeView }) {
  const theme = useTheme();
  const [liked, setLiked] = useState(isLiked);
  const [playViewOpen, setPlayViewOpen] = useState(false);
  const [otherArtistViewOpen, setOtherArtistViewOpen] = useState(false);


  const classes = useStyles();



  // Favorite Song Event Handling
  const handleLikeClick = (event) => {
    event.stopPropagation();
    console.log("🚀 handleLikeClick: Handle Heart Click Event Here")
    setLiked(!liked);
  };

  return (
    <Card
      className={classes.card}
      raised
      style={{
        margin: '15px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        borderRadius: 0,
        minHeight: '16vh',
        maxHeight: '16vh',
      }}
      onClick={() => {
        handleSetArtistSongData(null,
          {
            title,
            artist,
            artistImageUrl,
            likedCount,
            play_count,
            path_to_song
          }
        );
        changeView('play');
      }
      }
    >
      {/* {playViewOpen && <Play
        title={title}
        artist={artist}
        artistImageUrl={artistImageUrl}
        likedCount={likedCount}
        playCount={playCount}
        trackUrl={path_to_song}
        handleClose={handleClosePlayView} />}

      {otherArtistViewOpen && <ProfileOtherArtist
        artist={artist}
        handleClose={handleOtherArtistProfileClose} />} */}

      <CardContent className={classes.content}>
        <Typography variant="h5" component="h5">
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          onClick={(event) => {
            event.stopPropagation();
            handleSetArtistSongData(
              {
                artist
              }, null
            );
            changeView('profile');
          }
          }
          style={{ cursor: 'pointer' }}>{artist}</Typography>
        {/* <div className={classes.subcontent}> */}
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton
            onClick={handleLikeClick}
          >
            {liked ? <Favorite /> : <FavoriteBorder />}
            {likedCount}
          </IconButton>
          <Typography>
            {play_count} Plays
            {/* 5 hours - Aaron Miller */}
          </Typography>
        </Box>
        {/* </div> */}
      </CardContent>
      <CardMedia
        className={classes.media}
        component="img"
        image={`${artistImageUrl}`}
      />
    </Card>
  );
}