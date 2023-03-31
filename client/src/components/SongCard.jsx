import React, { useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Play from './Play.jsx';
import Stack from '@mui/material/Stack';
import ArtistBadge from './ArtistBadge.jsx'
import axios from 'axios';


const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  media: {
    width: 156.16,
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
    pl: 1,
    pb: 1
  }
});

export default function SongCard({ title, artist, path_to_song, artistImageUrl, isLiked, likedCount, play_count, handleSetArtistSongData, changeView, id, profileData, view, tags, songID }) {

  const theme = useTheme();
  const [liked, setLiked] = useState(isLiked);
  const [playViewOpen, setPlayViewOpen] = useState(false);
  const [otherArtistViewOpen, setOtherArtistViewOpen] = useState(false);

    const classes = useStyles();
  // Favorite Song Event Handling
  const handleLikeClick = (event) => {
    event.stopPropagation();
    setLiked(!liked);
    try {
      axios.put('/likeSong', { songName: title, songId: songID, userId: profileData.id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislikeClick = (event) => {
    event.stopPropagation();
    setLiked(!liked);
    try {
      axios.put('/dislikeSong', { songName: title, songId: id, userId: profileData.id });
    } catch (error) {
      console.error(error);
    }
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
        handleSetArtistSongData(null,
          {
            title,
            artist,
            artistImageUrl,
            likedCount,
            play_count,
            path_to_song,
            id,
            tags
          }
        );
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
            handleSetArtistSongData(artist, null);
          }}
          style={{ cursor: 'pointer', marginTop: '8px' }}
        >
          {artist}
          <ArtistBadge username={artist} view={view} />
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          {view !== 'favorites' && <IconButton onClick={handleLikeClick}>
            {liked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>}
          {view === 'favorites' && <IconButton onClick={handleDislikeClick}>
          {liked ? <FavoriteBorder /> : <Favorite />}
          </IconButton>}
          <Typography variant="body2" color="textSecondary" component="span">
            {liked ? likedCount + 1 : likedCount}
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