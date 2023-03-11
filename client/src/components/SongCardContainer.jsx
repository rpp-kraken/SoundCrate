import React from 'react';
import { Card, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';

export default function SongCardContainer({ title, time, artist, artistImageUrl, isLiked }) {
  const [liked, setLiked] = React.useState(isLiked);
  const handleLikeClick = () => {
    setLiked(!liked);
  };
  return (
    <Card
      id="songCard"
      raised
      sx={{
        maxWidth: 280,
        margin: "0 auto",
        padding: "0.1em",
        minHeight: "100%"
      }}
    >
      <CardMedia
        component="img"
        image=""
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          Is Cool!
        </Typography>
        <Typography color="textSecondary">
          5 hours - Aaron Miller
        </Typography>
      </CardContent>
      <IconButton onClick={handleLikeClick}>
        {liked ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Card>
  );
}