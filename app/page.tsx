import { Metadata } from 'next';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import appconfig from '@/appconfig';
import { coin as CoinType } from '@prisma/client';
import { getCoins } from '@/http/coin';
import HomePageCoinDetail from './components/HomePageCoinDetail';
import { Card } from '@mui/material';

export const metadata: Metadata = {
  title: appconfig.siteName,
  description: 'Welcome to Coin Organizer site.',
};

export default async function Home() {
  const MAX_COINS: number = 5;
  const coins: CoinType[] = await getCoins(MAX_COINS);

  return (
    <main>
      <Container>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            style={{
              marginTop: '20px',
              boxShadow: 'none',
            }}
            gutterBottom
          >
            Latest Coins Added
          </Typography>

          {Array.isArray(coins) &&
            coins.length > 0 &&
            coins.map((coin: CoinType) => (
              <>
                <HomePageCoinDetail key={coin.id} coin={coin} />
              </>
            ))}
        </Box>
      </Container>
    </main>
  );
}
