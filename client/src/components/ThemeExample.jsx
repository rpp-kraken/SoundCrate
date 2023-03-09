import React from 'react';
import { Typography, Card  } from '@mui/material';
import { useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


export default function ThemeExample() {
  const theme = useTheme();

  return (
    <div>
      <Typography variant="h1" component="h1" sx={{ fontFamily: 'h1' }}>
        My Heading 1
      </Typography>
      <Typography variant="h2" component="h2" sx={{ fontFamily: 'h2' }}>
        My Heading 2
      </Typography>
      <Typography variant="h3" component="h3" sx={{ fontFamily: 'h3' }}>
        My Heading 3
      </Typography>
      <Typography variant="bodyText" component="p">
        My Body Text 1
      </Typography>
      <Typography variant="bodyText2" component="p">
        My Body Text 2
      </Typography>
      <Box sx={{ flexGrow: 1, marginTop: '15px' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ textAlign: 'center', backgroundColor: theme.palette.primary.main}}>Primary Color</Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ textAlign: 'center', backgroundColor: theme.palette.secondary.main}}>Secondary Color</Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}