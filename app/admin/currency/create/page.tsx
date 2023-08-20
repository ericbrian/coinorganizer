'use client';

import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React, { FormEvent, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { CurrencyInputType } from '@/global';
import { Prisma } from '@prisma/client';
import { getCurrencyById, persistCurrency } from '@/http/currency';
import { useParams, usePathname } from 'next/navigation';
import { currency as CurrencyType } from '@prisma/client';
import { getIdFromPath } from '@/utils';

export default function AddCurrency() {
  const pathname = usePathname();
  const [isEdit, setIsEdit] = useState(false);

  const [currency, setCurrency] = useState<CurrencyType | null>(null);
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [comments, setComments] = useState('');
  const [years, setYears] = useState('');
  const [displayShortNameAtLeft, setDisplayShortNameAtLeft] = useState(true);
  const [demonitizedDate, setDemonitizedDate] = useState('');
  const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [countryName, setCountryName] = useState<string>('');

  const params = useParams();

  useEffect(() => {
    try {
      const currentCountry = (params.id as string).split('-');
      const id = currentCountry.at(-1);
      if (id) setCountryId(parseInt(id, 10));
      setCountryName(currentCountry.at(0) || '');
    } catch (e) {}

    setIsEdit(pathname.includes('/edit'));
  }, []);

  useEffect(() => {
    if (isEdit) {
      const id = getIdFromPath(pathname);
      if (id) {
        getCurrencyById(id).then((data: CurrencyType | null) => {
          if (!data) return;
          setCurrency(data);
          setName(data.name);
          setShortName(data.short_name);
          setComments(data.comments?.toString() || '');
          setYears(data.years?.toString() || '');
          setDisplayShortNameAtLeft(data.display_short_name_at_left);
          setDemonitizedDate(data.demonitized_date?.toString() || '');
        });
      }
    }
  }, [isEdit]);

  const getFormValues = (): CurrencyInputType => {
    const formData: CurrencyInputType = {
      name,
      shortName,
      years,
      comments,
      displayShortNameAtLeft,
      demonitizedDate,
      countryId,
    };

    if (isEdit) {
      formData['id'] = currency?.id as number;
    }

    return formData;
  };

  const clearForm = () => {
    setName('');
    setShortName('');
    setComments('');
    setYears('');
    setDisplayShortNameAtLeft(true);
    setDemonitizedDate('');
    // setCountryId(null);
    // setCountryName('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const payload: CurrencyInputType = getFormValues();
    persistCurrency(payload)
      .then(() => {
        setSnackbarAlertOpen(true);
        clearForm();
      })
      .catch((e: any) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          const target = e.meta?.target;
          // The .code property can be accessed in a type-safe manner
          if (e.code === 'P2002') {
            console.log(`There is a unique constraint violation, a new coin cannot be created in field ${target}.`);
          }
        }
        throw e;
      });
  };

  return (
    <Container>
      <Box>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Currency - {isEdit ? 'Edit' : 'Create'} {!isEdit && countryName && ` for ${countryName}`}
        </Typography>

        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Name"
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
            label="Symbol"
            onChange={(e) => setShortName(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={shortName}
          />
          <TextField
            label="Years"
            onChange={(e) => setYears(e.target.value)}
            variant="outlined"
            required
            color="secondary"
            type="text"
            value={years}
            fullWidth
            sx={{ mb: 3 }}
          />
          <TextField
            label="Comments"
            onChange={(e) => setComments(e.target.value)}
            variant="outlined"
            color="secondary"
            type="text"
            value={comments}
            fullWidth
            sx={{ mb: 3 }}
          />
          <FormControlLabel
            label="Display the Symbol at the left of the amount"
            control={
              <Checkbox
                checked={displayShortNameAtLeft}
                onChange={() => setDisplayShortNameAtLeft(!displayShortNameAtLeft)}
              />
            }
          />
          <TextField
            id="demonitized-date"
            label="Demonitized Date"
            type="date"
            color="secondary"
            value={demonitizedDate}
            fullWidth
            sx={{ mb: 3, mt: 3 }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(value) => setDemonitizedDate((value as never as dayjs.Dayjs).format('YYYY-MM-DDTHH:mm:ssZ'))}
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
        <Snackbar
          open={snackbarAlertOpen}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() => setSnackbarAlertOpen(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Coin saved!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
