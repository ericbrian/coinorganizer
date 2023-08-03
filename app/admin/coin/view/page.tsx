import { getCountryList } from '@/http/country';
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
import { coin as CoinType } from '@prisma/client';
import moment from 'moment';
import React from 'react';

export default async function page() {
    return (
        <Container>
            <Box>
                <Typography variant="body2" gutterBottom>
                    <Link href="../">&lt;&lt;&lt; Go Back</Link>
                </Typography>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Coin List
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <Link href="/admin/coin/create">Create new Coin</Link>
                </Typography>{' '}
                <Typography variant="h5" gutterBottom>
                    To view coin details, go to the{' '}
                    <Link href="/pages/coins">Coins</Link> page.
                </Typography>
            </Box>
        </Container>
    );
}
