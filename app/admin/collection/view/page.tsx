import { getCurrencyList } from '@/http/currency';
import {
  Container,
  Box,
  Typography,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from '@mui/material';
import { currency as CurrencyType } from '@prisma/client';
import moment from 'moment';
import React from 'react';

export default async function page() {
  const currencies: CurrencyType[] = await getCurrencyList();
  return (
    <Container>
      <Box>
        <Typography variant="body2" gutterBottom>
          <Link href="../">&lt;&lt;&lt; Go Back</Link>
        </Typography>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Currency List
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Link href="/user/dashboard/add-coin">Add Coin to Collection</Link>
        </Typography>
        <Typography variant="body2" gutterBottom>
          To view the coins in your collection, go to your
          <Link href="/user/dashboard">dashboard</Link>. You can find that under your profile.
        </Typography>
      </Box>
    </Container>
  );
}
