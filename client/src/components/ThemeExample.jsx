import React from 'react';
import { Typography, Card, TableCell  } from '@mui/material';
import { useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


export default function ThemeExample() {
  const theme = useTheme();

  var cardStyle = {
    display: 'flex',
    transitionDuration: '0.3s',
    padding: '15px',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minWidth: 'fit-content',
  }

  return (
    <>
      <TableCell sx={{ padding: 0 }}>
        <Box id='font-examples' sx={{ width: '100%' }}>
          <Grid container spacing={1} p={2} sx={{ backgroundColor: 'black', textAlign: 'center' }}>
            <Grid item xs={12} sx={{ alignItems: 'center' }}>
              <Typography variant='h1'>
                My Heading 1
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h2'>
                My Heading 2
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h3'>
                My Heading 3
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4'>
                My Heading 4
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='bodyText' component='p'>
                My Body Text 1
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='bodyText2' component='p'>
                My Body Text 2
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box id='color-palette-examples' sx={{ flexGrow: 1, minWidth: 'fit-content' }}>
          <Grid container spacing={2} p={4} sx={{ backgroundColor: theme.palette.background.default }}>
            <Typography variant='bodyText' sx={{ width: '100%', textAlign: 'center' }}>theme.palette.background.default</Typography>
            <Grid item xs={12}>
              <Card sx={{ ...cardStyle, backgroundColor: theme.palette.primary.light}}>
                <Typography variant='h4'>theme.palette.primary.light</Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ ...cardStyle, backgroundColor: theme.palette.primary.main}}>
                <Typography variant='h4'>theme.palette.primary.main</Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ ...cardStyle, backgroundColor: theme.palette.primary.dark}}>
                <Typography variant='h4'>theme.palette.primary.dark</Typography>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2} p={4} sx={{ backgroundColor: theme.palette.background.secondary }}>
            <Typography variant='bodyText' sx={{ width: '100%', textAlign: 'center' }}>theme.palette.background.secondary</Typography>
            <Grid item xs={12}>
              <Card sx={{ ...cardStyle, backgroundColor: theme.palette.secondary.light}}>
                <Typography variant='h4'>theme.palette.secondary.light</Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ ...cardStyle, backgroundColor: theme.palette.secondary.main}}>
                <Typography variant='h4'>theme.palette.secondary.main</Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ ...cardStyle, backgroundColor: theme.palette.secondary.dark}}>
                <Typography variant='h4'>theme.palette.secondary.dark</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </TableCell>
      </>
  );
}