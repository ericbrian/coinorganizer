'use client';

import { Container, Box, Typography, Link, CardMedia, Autocomplete, TextField, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCoinsForCountry, relateMintAndCoin } from '@/http/coin';
import { getCountriesWithCoinsList } from '@/http/country';
import { getMintsForCountry } from '@/http/mint';

import { Prisma, country as CountryType, mint as MintType } from '@prisma/client';
type CoinType = Prisma.coinGetPayload<{
  include: {
    coin_mint: { include: { mint: true } };
  };
}>;

interface EventTarget {
  id: any;
  appendChild: any;
}

export default function page() {
  const [loading, setLoading] = useState(true);
  const [countryList, setCountryList] = useState<CountryType[]>([]);
  const [country, setCountry] = useState<CountryType | null>(null);
  const [coins, setCoins] = useState<CoinType[]>([]);
  const [mints, setMints] = useState<MintType[]>([]);

  useEffect(() => {
    getCountriesWithCoinsList().then((data) => {
      setCountryList(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (country) {
      setLoading(true);
      getCoinsForCountry(country.id).then((data) => {
        setCoins(data);
      });
      getMintsForCountry(country.id).then((data) => {
        setMints(data);
      });
      setLoading(false);
    }
  }, [country]);

  //#region dnd
  const allowDrop = (e: any) => e.preventDefault();
  const drag = (e: React.DragEvent) => {
    const eventTarget: EventTarget = e.target as unknown as EventTarget;
    e.dataTransfer?.setData('text', eventTarget.id);
  };
  const drop = (e: React.DragEvent) => {
    e.preventDefault();

    const eventTarget: EventTarget = e.target as unknown as EventTarget;

    const coinId = eventTarget.id.split('-').at(-1);
    const mintId = e.dataTransfer?.getData('text').split('-').at(-1);

    console.log('coinId', coinId);
    console.log('mintId', mintId);

    if (coinId && mintId) {
      relateMintToCoin(+coinId, +mintId);
    } else {
      throw new Error('coinId or data is null');
    }
  };
  const relateMintToCoin = (coin_id: number, mint_id: number) => relateMintAndCoin(coin_id, mint_id);

  //#endregion

  return (
    <>
      <Container>
        <Box>
          <Typography variant="body2" gutterBottom>
            <Link href="../">&lt;&lt;&lt; Go Back</Link>
          </Typography>
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>
            Add Mint to Coins
          </Typography>
        </Box>
      </Container>
      <Grid container spacing={2}>
        {countryList && (
          <>
            <Grid item xs={3}>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', textAlign: 'right' }}>
                Country:
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                disablePortal
                id="country-select"
                options={countryList}
                value={country}
                defaultValue={country}
                onChange={(_e, value) => {
                  if (value) {
                    setCountry(value);
                  } else {
                    setCountry(null);
                  }
                }}
                sx={{ width: 700 }}
                renderInput={(params) => <TextField {...params} label="Country" />}
                getOptionLabel={(option) => option.short_name}
                renderOption={(props: object, option: CountryType, state: object) => (
                  <div {...props} key={option.id}>
                    {option.short_name}
                  </div>
                )}
              />
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {mints.length > 0 &&
            mints.map((mint) => (
              <div
                key={mint.id}
                style={{
                  display: 'inline-block',
                  height: '160px',
                  width: '160px',
                  margin: '1px',
                  padding: '2px',
                }}
                id={'mintid-' + mint.id}
                draggable="true"
                onDragStart={(e) => drag(e)}
              >
                {mint.mint} {mint.id} {mint.mark}
              </div>
            ))}
        </Grid>
        <Grid item xs={9}>
          {loading && <div>Loading...</div>}
          {coins.length > 0 &&
            coins
              .filter((coin) => coin.coin_mint.length > 0)
              .map((coin) => (
                <div
                  key={coin.id}
                  id={'coinid-' + coin.id}
                  style={{
                    display: 'inline-block',
                    height: '90px',
                    width: '170px',
                    border: '1px solid black',
                    margin: '5px',
                    padding: '2px',
                  }}
                  onDrop={(e) => drop(e)}
                  onDragOver={(e) => allowDrop(e)}
                >
                  {coin.common_name}, {coin.year_start}-{coin.year_end} ({coin.pretty_face_value}) (#
                  {coin.id})
                </div>
              ))}
        </Grid>
      </Grid>
    </>
  );
}
