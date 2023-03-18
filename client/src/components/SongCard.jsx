import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Play from './Play.jsx';
import ProfileOtherArtist from './ProfileOtherArtist.jsx';
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

export default function SongCard({ title, artist, path_to_song, artistImageUrl, isLiked, likedCount, playCount }) {
  const theme = useTheme();
  const [liked, setLiked] = useState(isLiked);
  const [playViewOpen, setPlayViewOpen] = useState(false);
  const [otherArtistViewOpen, setOtherArtistViewOpen] = useState(false);

  const classes = useStyles();

  // Play View Event Handling
  const handleOpenPlayView = (event) => {
    event.stopPropagation();
    setPlayViewOpen(true);
  };
  const handleClosePlayView = (event) => {
    setPlayViewOpen(false);
  };

  // Favorite Song Event Handling
  const handleLikeClick = (event) => {
    event.stopPropagation();
    console.log("🚀 handleLikeClick: Handle Heart Click Event Here")
    setLiked(!liked);
  };

  // Other Artist Profile View Event Handling
  const handleOtherArtistProfileOpen = (event) => {
    event.stopPropagation();
    setOtherArtistViewOpen(true);
  };
  const handleOtherArtistProfileClose = (event) => {
    setOtherArtistViewOpen(false);
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
  onClick={handleOpenPlayView}
>
  {playViewOpen && (
    <Play
      title={title}
      artist={artist}
      artistImageUrl={artistImageUrl}
      likedCount={likedCount}
      playCount={playCount}
      trackUrl={path_to_song}
      handleClose={handleClosePlayView}
    />
  )}

  {otherArtistViewOpen && (
    <ProfileOtherArtist artist={artist} handleClose={handleOtherArtistProfileClose} />
  )}

  <CardContent className={classes.content}>
    <Typography variant="h5" component="h5" style={{ fontSize: '1.25rem' }}>
      {title}
    </Typography>
    <Typography
      variant="subtitle1"
      onClick={handleOtherArtistProfileOpen}
      style={{ cursor: 'pointer', marginTop: '8px' }}
    >
      {artist}
    </Typography>
    <Stack direction="row" alignItems="center" spacing={2} mt={1}>
      <IconButton onClick={handleLikeClick}>
        {liked ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
      <Typography variant="body2" color="textSecondary" component="span">
        {likedCount}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="span">
      🎵 {playCount} Plays
      </Typography>
    </Stack>
  </CardContent>
  <CardMedia className={classes.media} component="img" image={`${artistImageUrl}`} />
</Card>






  );
}