'use client';

import HomePageCoinDetail from '@/app/components/HomePageCoinDetail';
import { getUserCollectionCountries } from '@/http/collection';
import { Container, Box, Typography, Link, Card, Grid } from '@mui/material';
import { collection as CollectionType } from '@prisma/client';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
        setCountryName(data[0].coin.country.short_name);
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
                    <Grid item xs={1}>
                      Y: {item.year}
                    </Grid>
                    <Grid item xs={2}>
                      Paid: {item.currency.name} {item.currency.short_name}{' '}
                      {item.paid_amount ? (+item.paid_amount).toFixed(2) : '0.00'}
                    </Grid>
                    <Grid item xs={3}>
                      Purchased: {moment(item.sourced_when).format('MMM D, yyyy')}
                    </Grid>
                    <Grid item xs={4}>
                      Purchased From: {item.sourced_from}
                    </Grid>
                    <Grid item xs={2}>
                      <small>
                        Coin# {item.coin.id} / Col# {item.id}
                      </small>
                    </Grid>
                  </Grid>
                </Card>
                <HomePageCoinDetail coin={item.coin} />
              </div>
            );
          })}
      </Box>
    </Container>
  );
}
