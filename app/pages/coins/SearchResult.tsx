import { theme } from '@/app/theme';
import appconfig from '@/appconfig';
import { Card, Box, CardContent, Typography, IconButton, CardMedia, Link } from '@mui/material';
import React from 'react';

export default function SearchResult({ props }: any) {
  return (
    <Card sx={{ display: 'flex' }} className="sr_card">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            <Link
              href={`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/pages/coin-details?id=${props.objectID}`}
            >
              {props.common_name} ({props.year_start}
            </Link>
            {props.year_end !== props.year_start ? ` - ${props.year_end}` : ''})
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.series_or_theme_name}
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div" gutterBottom>
            {props.pretty_face_value} ({props.currency})
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div">
            <strong>Obverse</strong>: {props.obverse}
          </Typography>
          {props.reverse && (
            <Typography variant="body1" color="text.secondary" component="div">
              <strong>Reverse</strong>: {props.reverse}
            </Typography>
          )}
          {props.composition && (
            <Typography variant="body1" color="text.secondary" component="div">
              <strong>Composition</strong>: {props.composition}
            </Typography>
          )}
          <Typography variant="body1" color="text.secondary" component="div">
            <small>#{props.objectID}</small>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
