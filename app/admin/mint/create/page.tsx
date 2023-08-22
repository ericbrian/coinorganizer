'use client';

import { MintInputType } from '@/global';
import { getCountryList } from '@/http/country';
import { persistMint } from '@/http/mint';
import { Container, Box, Typography, Button, TextField, Autocomplete } from '@mui/material';
import { country as CountryType } from '@prisma/client';
import React, { FormEvent, use, useEffect, useState } from 'react';

export default function page() {
  const [isLoading, setIsLoading] = useState(true);

  const [mint, setMint] = useState('');
  const [location, setLocation] = useState('');
  const [mark, setMark] = useState('');
  const [years, setYears] = useState('');

  const [countryList, setCountryList] = useState<CountryType[]>([]);
  const [country, setCountry] = useState<CountryType | null>(null);

  useEffect(() => {
    getCountryList().then((data) => {
      setCountryList(data);
      setIsLoading(false);
    });
  }, []);

  const getPayload = (): MintInputType => {
    return {
      mint,
      location,
      mark,
      years,
      country,
    };
  };

  const clearForm = () => {
    setCountry(null);
    setMint('');
    setLocation('');
    setMark('');
    setYears('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const payload = getPayload();
    persistMint(payload).then((data) => {
      clearForm();
    });
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Mint - Create
        </Typography>

        {!isLoading && (
          <form autoComplete="off" onSubmit={handleSubmit}>
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
              fullWidth
              renderInput={(params) => <TextField {...params} label="Country" />}
              getOptionLabel={(option) => option.short_name}
              renderOption={(props: object, option: CountryType, state: object) => (
                <div {...props} key={option.id}>
                  {option.short_name}
                </div>
              )}
            />
            <TextField
              label="Mint"
              onChange={(e) => setMint(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3, mt: 5 }}
              fullWidth
              value={mint}
            />
            <TextField
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              value={location}
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Mark"
              onChange={(e) => setMark(e.target.value)}
              variant="outlined"
              color="secondary"
              type="text"
              value={mark}
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Years"
              onChange={(e) => setYears(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              value={years}
              fullWidth
              sx={{ mb: 3 }}
            />
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
}
