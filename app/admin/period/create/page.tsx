'use client';

import { Container, Box, Typography, Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';

export default function page() {
  const [period, setPeriod] = useState('');
  const [years, setYears] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }
  return (
    <Container>
      <Box>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Period - Create
        </Typography>

        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Period"
            onChange={(e) => setPeriod(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{ mb: 3, mt: 5 }}
            fullWidth
            value={period}
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
      </Box>
    </Container>
  );
}
