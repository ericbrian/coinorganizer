'use client';

import { getCountryById, getCountryList } from '@/http/country';
import { Container, Box, Typography, Autocomplete, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { country as CountryType } from '@prisma/client';
import React, { FormEvent, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getIdFromPath } from '@/utils';

export default function AddCountry() {
  const pathname = usePathname();

  // LOVs
  const [countryList, setCountryList] = useState<CountryType[]>([]);

  // Form Data
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [parent, setParent] = useState<CountryType | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [countryCode, setCountryCode] = useState('');

  // Page State
  const [isLoading, setIsLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    getCountryList().then((data) => {
      setCountryList(data);

      const id = getIdFromPath(pathname);
      if (id) {
        setEditId(id);
        setIsLoading(true);
        getCountryById(id)
          .then((data: CountryType) => {
            setName(data.name);
            setShortName(data.short_name);
            setIsActive(data.is_active);
            setParent(data.country);
            setCountryCode(data.iso_3166_alpha_2);
          })
          .catch((error: any) => {
            console.error(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    });
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <Container>
      <Box>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Country - {pathname.includes('/edit') ? 'Edit' : 'Create'}
        </Typography>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="Official Name"
              onChange={(e) => setName(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{ mb: 3, mt: 5 }}
              fullWidth
              value={name}
            />
            <TextField
              label="Short Name"
              onChange={(e) => setShortName(e.target.value)}
              required
              variant="outlined"
              color="secondary"
              type="text"
              value={shortName}
              fullWidth
              sx={{ mb: 3 }}
            />
            <TextField
              label="Country Code (ISO 3166-1 alpha-2)"
              onChange={(e) => setCountryCode(e.target.value)}
              value={countryCode}
              variant="outlined"
              color="secondary"
              type="text"
              fullWidth
              sx={{ mb: 3 }}
              inputProps={{ maxLength: 2 }}
            />
            <Autocomplete
              disablePortal
              id="country-select"
              options={countryList}
              value={parent}
              defaultValue={parent}
              onChange={(_e, value) => {
                if (value) {
                  setParent(value);
                } else {
                  setParent(null);
                }
              }}
              sx={{ width: 700 }}
              renderInput={(params) => <TextField {...params} label="Parent Country" />}
              getOptionLabel={(option) => option.short_name}
              renderOption={(props: object, option: CountryType, state: object) => (
                <div {...props} key={option.id}>
                  {option.short_name}
                </div>
              )}
            />
            <div>
              <FormControlLabel
                control={<Checkbox checked={isActive} />}
                label="Is Active"
                onChange={() => setIsActive(!isActive)}
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
}
