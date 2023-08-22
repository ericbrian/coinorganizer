'use client';

import { Container, Box, Typography, Button, TextField, Autocomplete } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { country as CountryType } from '@prisma/client';
import { RulerInputType } from '@/global';
import { getCountryList } from '@/http/country';
import { persistRuler } from '@/http/ruler';

export default function page() {
  const [isLoading, setIsLoading] = useState(true);

  const [countryList, setCountryList] = useState<CountryType[]>([]);

  const [ruler, setRuler] = useState('');
  const [house, setHouse] = useState('');
  const [years, setYears] = useState('');
  const [country, setCountry] = useState<CountryType | null>(null);

  useEffect(() => {
    getCountryList().then((data) => {
      setCountryList(data);
      setIsLoading(false);
    });
  }, []);

  const getPayload = (): RulerInputType => {
    return {
      ruler,
      house,
      years,
      country,
    };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const payload = getPayload();
    persistRuler(payload).then(() => {
      clearForm();
    });
  };

  const clearForm = () => {
    setCountry(null);
    setRuler('');
    setHouse('');
    setYears('');
  };
  return (
    <Container>
      <Box>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Ruler - Create
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
              label="Ruler"
              onChange={(e) => setRuler(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3, mt: 5 }}
              fullWidth
              value={ruler}
            />
            <TextField
              label="House"
              onChange={(e) => setHouse(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              value={house}
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
