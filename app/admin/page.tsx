import { Container, Box, Typography, Button } from '@mui/material';
import React from 'react';

export default function page() {
  return (
    <Container>
      <Box>
        <Typography variant="h4" style={{ fontWeight: 'bold' }} gutterBottom>
          Data Management
        </Typography>

        <Typography variant="h6">
          <Button variant="contained" color="primary" href="/admin/coin/view">
            Coin
          </Button>{' '}
          <Button variant="contained" color="primary" href="/admin/country/view">
            Country
          </Button>{' '}
          <Button variant="contained" color="primary" href="/admin/currency/view">
            Currency
          </Button>{' '}
          <Button variant="contained" color="primary" href="/admin/engraver/view">
            Engraver/Designer
          </Button>{' '}
          <Button variant="contained" color="primary" href="/admin/mint/view">
            Mint
          </Button>{' '}
          <Button variant="contained" color="primary" href="/admin/period/view">
            Period
          </Button>{' '}
          <Button variant="contained" color="primary" href="/admin/ruler/view">
            Ruler
          </Button>{' '}
          <Button variant="contained" color="primary" href="/admin/shape/view">
            Shape
          </Button>{' '}
        </Typography>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }} gutterBottom>
          Other
        </Typography>
        <Typography variant="h6">
          <Button variant="contained" color="primary" href="/user/dashboard/add-coin">
            Add Coin to your Collection
          </Button>{' '}
          <Button variant="contained" color="primary" href="/admin/coin/add-images">
            Add Images to Coins
          </Button>{' '}
          <Button variant="contained" color="primary" href="/admin/coin/add-mints">
            Add Mints to Coins
          </Button>{' '}
        </Typography>{' '}
      </Box>
    </Container>
  );
}
