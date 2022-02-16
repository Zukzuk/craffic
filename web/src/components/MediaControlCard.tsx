import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IMAGE_DUMMY } from '../utils/constants'

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', width: 200 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6" sx={{ flex: '1 0 auto', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            Live From Space in the House through the Roof
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={IMAGE_DUMMY}
          sx={{ display: 'flex' }}
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: .5, pb: .5}}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      
    </Card>
  );
}
