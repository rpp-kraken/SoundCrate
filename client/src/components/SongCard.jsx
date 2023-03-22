import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Play from './Play.jsx';
import Stack from '@mui/material/Stack';


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

  // const returnIcon = (count) => {
  //   if(count >= 250000 && count <= 499000) {
  //     return 'bronze'
  //   }
  //   if(count >= 500000 && count <= 999999) {
  //     return <img src={'/client/dist/silver-icon-badge.PNG'} />
  //   }
  //   if(count >= 1000000) {
  //     return 'gold'
  //   }
  // }

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
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={() => {
        handleSetArtistSongData(null, {
          title,
          artist,
          artistImageUrl,
          likedCount,
          play_count,
          path_to_song
        });
        changeView('play');
      }}
    >
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h5" style={{ fontSize: '1.25rem' }}>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          onClick={(event) => {
            event.stopPropagation();
            handleSetArtistSongData({ artist }, null);
            changeView('profile');
          }}
          style={{ cursor: 'pointer', marginTop: '8px' }}
        >
          {artist}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <IconButton onClick={handleLikeClick}>
            {liked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2" color="textSecondary" component="span">
            {likedCount}
            {likedCount >= 250000 && likedCount <= 499999 && <img src={'silver.png'} className="badge-icon"/>}
            {likedCount >= 500000 && likedCount <= 999999 && <img src={'bronze-icon-badge.png'} className="badge-icon"/>}
            {likedCount >= 1000000 && <img src={'gold-icon-badge.png'} className="badge-icon"/>}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
            {`🎧 ${play_count}`}
          </Typography>
        </Stack>
      </CardContent>
      <CardMedia className={classes.media} component="img" image={`${artistImageUrl}`} />
    </Card>
  );
}