'use client';

import HomePageCoinDetail from '@/app/components/HomePageCoinDetail';
import { getUserCollectionCountries } from '@/http/collection';
import { Container, Box, Typography, Link, Card, Grid } from '@mui/material';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SellIcon from '@mui/icons-material/Sell';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InventoryIcon from '@mui/icons-material/Inventory';

import { Prisma } from '@prisma/client';
type CollectionType = Prisma.collectionGetPayload<{
  include: {
    coin: { include: { country: true } };
    currency: true;
  };
}>;

export default function page() {
  const params = useParams();
  const countryCode = (params.cc as string) || null;

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('No coins found!');
  const [countryName, setCountryName] = useState(params.cc as string);
  const [collectionItems, setCollectionItems] = useState<CollectionType[]>([]);

  useEffect(() => {
    getUserCollectionCountries(countryCode).then((data: CollectionType[]) => {
      setIsLoading(false);
      if (data?.length > 0) {
        const item = data[0];
        setCountryName(item.coin?.country?.short_name ?? '');
        setCollectionItems(data);
      } else if ('message' in data) setMessage(data.message as string);
    });
  }, []);

  return (
    <Container>
      <Box>
        <Typography variant="body2" gutterBottom>
          <Link href="../">&lt;&lt;&lt; Go Back</Link>
        </Typography>
        <Typography variant="h6">Your Coins by Country</Typography>
        <Typography variant="h4" gutterBottom>
          {countryName}
        </Typography>
        {isLoading && <div>Loading...</div>}
        {!isLoading && collectionItems.length === 0 && <div>{message}</div>}
        {!isLoading &&
          collectionItems.length > 0 &&
          collectionItems.map((item) => {
            return (
              <div key={item.id}>
                <Card
                  sx={{
                    display: 'flex',
                    marginBottom: '15px',
                    padding: '5px',
                    backgroundColor: '#008000',
                    color: '#ffffff',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={2}
                      container={true}
                      style={{
                        alignItems: 'center',
                      }}
                    >
                      <span title="Mint Year">
                        <CalendarTodayIcon sx={{ mr: 1 }} />
                      </span>
                      {item.year}
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      container={true}
                      style={{
                        alignItems: 'center',
                      }}
                    >
                      <span title="Price">
                        <SellIcon sx={{ mr: 1 }} />
                      </span>
                      <span title={item.currency?.name}>
                        {item.currency?.short_name} {item.paid_amount ? (+item.paid_amount).toFixed(2) : '0.00'}
                      </span>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      container={true}
                      style={{
                        alignItems: 'center',
                      }}
                    >
                      <span title="Sourced From">
                        <LocationOnIcon sx={{ mr: 1 }} />
                      </span>
                      {item.sourced_from}, {moment(item.sourced_when).format('MMM D, yyyy')}
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      container={true}
                      style={{
                        alignItems: 'center',
                      }}
                    >
                      <span title="Storage Location">
                        <InventoryIcon sx={{ mr: 1 }} />
                      </span>
                      {item.storage ? item.storage : 'Unknown'}
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      container={true}
                      style={{
                        alignItems: 'center',
                      }}
                    >
                      <small>
                        Coin# {item.coin?.id} / Col# {item.id}
                      </small>
                    </Grid>
                  </Grid>
                </Card>
                {item.coin && <HomePageCoinDetail coin={item.coin} />}
              </div>
            );
          })}
      </Box>
    </Container>
  );
}
