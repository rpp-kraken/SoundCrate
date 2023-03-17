import React, {useState} from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Play from './Play.jsx';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  media: {
    width: 120,
    height: 'fill',
    objectFit: 'fill',
    marginLeft: 'auto'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  subcontent: {
    display: 'flex',
    pl:1,
    pb:1
  }
});

export default function SongCard({ title, time, artist, path_to_song, artistImageUrl, isLiked, likedCount, playCount }) {
  const theme = useTheme();
  const [liked, setLiked] = useState(isLiked);
  const [playViewOpen, setPlayViewOpen] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const classes = useStyles();

  const onClickOpenPlayView = (event) => {
    console.log("🚀 ~ PLAY VIEW: MODAL Pop Up that covers whole screen");
    setPlayViewOpen(true);
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
      onClick={onClickOpenPlayView}
    >
      {playViewOpen && <Play trackUrl={path_to_song} />}
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h5">
          {title}
        </Typography>
        <Typography variant="subtitle1">{artist}</Typography>
        {/* <div className={classes.subcontent}> */}
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <IconButton
          onClick={handleLikeClick}
        >
          {liked ? <Favorite /> : <FavoriteBorder />}
          {likedCount}
        </IconButton>
        <Typography>
          {playCount} Plays
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