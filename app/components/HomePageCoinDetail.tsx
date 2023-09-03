import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Link from 'next/link';
import appconfig from '@/appconfig';
import { Grid } from '@mui/material';

import { Prisma } from '@prisma/client';
type CoinType = Prisma.coinGetPayload<{
  include: {
    image: true;
  };
}>;

export default function HomePageCoinDetail(props: { coin: CoinType }) {
  const coin = props.coin;

  return (
    <>
      <Card sx={{ display: 'flex', marginBottom: '15px', padding: '5px', boxShadow: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            &nbsp;
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  <Link href={`/coin-details?id=${coin.id}`}>
                    {coin.common_name}
                    {coin.pretty_face_value &&
                      coin.pretty_face_value != coin.common_name &&
                      ' (' + coin.pretty_face_value + ')'}
                  </Link>
                </Typography>
                {coin.series_or_theme_name && (
                  <Typography
                    style={{
                      fontSize: 'small',
                      textTransform: 'uppercase',
                    }}
                  >
                    Series: {coin.series_or_theme_name}
                  </Typography>
                )}
                <Typography>
                  <span style={{ fontWeight: 'bold' }}>Obverse: </span>
                  {coin.obverse}
                </Typography>
                <Typography>
                  <span style={{ fontWeight: 'bold' }}>Reverse: </span>
                  {coin.reverse}
                </Typography>
                <Typography
                  style={{
                    fontSize: 'small',
                    marginTop: '10px',
                  }}
                >
                  Ref#: {coin.id}
                </Typography>{' '}
              </CardContent>
            </Box>
          </Grid>
          <Grid item xs={2}>
            {coin.image?.length > 0 && (
              <CardMedia
                component="img"
                sx={{ width: 160, borderRadius: '15px' }}
                image={appconfig.cdn + '/coin-images/' + coin.image[0].url}
                alt="Live from space album cover"
                style={{ marginTop: '20px' }}
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
