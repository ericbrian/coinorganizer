import type { Metadata } from 'next';
import Link from 'next/link';
import LinkIcon from '@mui/icons-material/Link';
import { getCoinById } from '@/http/coin';
import appconfig from '@/appconfig';
import { Container, Box, Typography, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { escapedNewLineToLineBreakTag } from '@/tsx-utils';

import { Prisma } from '@prisma/client';
type CoinType = Prisma.coinGetPayload<{
  include: {
    country: true;
    ruler: true;
    period: true;
    coin_mint: { include: { mint: true } };
    coin_engraver: { include: { engraver: true } };
    image: true;
  };
}>;

export const metadata: Metadata = {
  title: 'Coin Details',
};

export default async function CoinDetails({ searchParams }: any) {
  const coin: CoinType = await getCoinById(+searchParams.id);

  let display_name = `${coin.common_name}`;
  if (display_name != coin.pretty_face_value) {
    display_name += ` (${coin.pretty_face_value})`;
  }
  const comments_updated = escapedNewLineToLineBreakTag(coin.comments || '');

  return (
    <>
      {/*  The <Container> centers your content horizontally. It's the most basic layout element. */}
      <Container style={{ marginTop: '20px' }}>
        {/* The <Box> component serves as a wrapper component for most of the CSS utility needs. */}
        <Box>
          <Typography variant="body2" gutterBottom>
            <Link href="../">&lt;&lt;&lt; Go Back</Link>
          </Typography>
          <Grid container spacing={3}>
            <Grid xs={3}>
              <Typography>
                <span style={{ fontWeight: 'bold' }}>Country:</span>
                <br />
                {coin.country?.name}
              </Typography>
              <Typography style={{ marginTop: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Year(s):</span>
                <br />
                {coin.year_start}
                {coin.year_end && ` - ${coin.year_end}`}
              </Typography>
              {coin.ruler && (
                <Typography style={{ marginTop: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>Ruler:</span>
                  <br />
                  {coin.ruler.name} ({coin.ruler.years})
                </Typography>
              )}
              {coin.period && (
                <Typography style={{ marginTop: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>Period:</span>
                  <br /> {coin.period.name} <span className="whitespace-nowrap">({coin.period.years})</span>
                </Typography>
              )}
              <Typography style={{ marginTop: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Diameter:</span>
                <br />
                <span className="whitespace-nowrap">{coin.diameter_milimeters?.toString()} mm</span>
              </Typography>
              <Typography style={{ marginTop: '10px' }}>
                <span style={{ fontWeight: 'bold' }}>Weight:</span>
                <br />
                {coin.weight_grams?.toString()} g
              </Typography>
              {coin.numista_number && (
                <Typography style={{ marginTop: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>Numista Number:</span>
                  <br />
                  <Link
                    className="font-bold text-blue-500 underline"
                    href={`https://en.numista.com/catalogue/pieces${coin.numista_number}.html`}
                    target="numista"
                  >
                    {coin.numista_number} <LinkIcon sx={{ verticalAlign: 'middle' }} width={12} />
                  </Link>{' '}
                </Typography>
              )}
            </Grid>
            <Grid xs={7}>
              <Typography variant="h5" component="h2" gutterBottom>
                {display_name}
                {coin.series_or_theme_name && (
                  <Typography
                    style={{
                      textTransform: 'uppercase',
                      fontSize: 'small',
                    }}
                    gutterBottom
                  >
                    Series: {coin.series_or_theme_name}
                  </Typography>
                )}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Obverse: </span>
                {escapedNewLineToLineBreakTag(coin.obverse)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {coin.coin_engraver
                  ?.filter((ce) => ce.side == 'obverse')
                  .map(
                    (ce) =>
                      ce.engraver?.name && (
                        <>
                          <span style={{ fontWeight: 'bold' }}>Obverse Engraver/Designer: </span>
                          {ce.engraver.name}
                        </>
                      ),
                  )}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Reverse: </span>
                {escapedNewLineToLineBreakTag(coin.reverse)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {coin.coin_engraver
                  ?.filter((ce) => ce.side == 'reverse')
                  .map(
                    (ce) =>
                      ce.engraver?.name && (
                        <>
                          <span style={{ fontWeight: 'bold' }}>Reverse Engraver/Designer: </span>
                          {ce.engraver.name}
                        </>
                      ),
                  )}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Edge: </span>
                {coin.edge}
                {coin.edge_inscription && <span> with inscription: {coin.edge_inscription}</span>}
                <br />
              </Typography>
              <Typography variant="body1" gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Mint(s): </span>
                {coin.coin_mint?.map((cm) => {
                  const mint = cm.mint;
                  const mark = mint.mark ? '(' + mint.mark + ')' : '';
                  return `${mint.mint}, ${mint.mark_description} ${mark}`;
                })}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <span style={{ fontWeight: 'bold' }}>Composition: </span>
                {coin.composition}
              </Typography>
              {coin.comments && (
                <Typography variant="body1" gutterBottom>
                  <span style={{ fontWeight: 'bold' }}>Comments</span>: {comments_updated}
                </Typography>
              )}
            </Grid>
            <Grid xs={2}>
              {Array.isArray(coin.image) &&
                coin.image.length > 0 &&
                coin.image.map((image) => (
                  <CardMedia
                    component="img"
                    sx={{
                      width: 220,
                      borderRadius: '15px',
                      marginBottom: '10px',
                    }}
                    image={appconfig.cdn + '/coin-images/' + image.url}
                    alt={coin.common_name ?? 'Coin image'}
                    title={coin.common_name ?? 'Coin image'}
                  />
                ))}
            </Grid>
          </Grid>
          {/* The <Typography> component is the most basic typography component. It renders text. */}
        </Box>
      </Container>
    </>
  );
}
