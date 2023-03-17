import React from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import { useTheme} from '@mui/material/styles';

export default function SongCard({ title, time, artist, artistImageUrl, isLiked, playCount }) {
  const theme = useTheme();
  const [liked, setLiked] = React.useState(isLiked);
  const handleLikeClick = () => {
    setLiked(!liked);
  };
  return (
    <Card
      id="songCard"
      raised
      style={{
        margin: '15px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        borderRadius: 0,
        minHeight: '16vh'
      }}
    >
      <CardMedia
        component='img'
        image= {`${artistImageUrl}`}
        style={{ objectFit: 'fill', color: theme.palette.text.primary }}
      />
      <CardContent>
        <Typography variant='h5' component='h5'>
          {title}
        </Typography>
        <Typography>
          {artist}
         {/* 5 hours - Aaron Miller */}
        </Typography>
      </CardContent>
      {/* <IconButton onClick={handleLikeClick}>
        {liked ? <Favorite /> : <FavoriteBorder />}
      </IconButton> */}
      <Typography>
          {playCount}Plays
         {/* 5 hours - Aaron Miller */}
        </Typography>
    </Card>
  );
}