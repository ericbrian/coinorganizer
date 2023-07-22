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
                    <Link href="/admin/currency/create">
                        Create new Currency
                    </Link>
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Symbol</TableCell>
                                <TableCell>Years</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                                <TableCell>Demonitized Date</TableCell>
                                <TableCell>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currencies.map((currency) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {currency.id}
                                    </TableCell>
                                    <TableCell>{currency.name}</TableCell>
                                    <TableCell>{currency.short_name}</TableCell>
                                    <TableCell>{currency.years}</TableCell>
                                    <TableCell>
                                        {moment(currency.created_at).format(
                                            'MMM DD, YYYY, HH:mm:ss',
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {moment(currency.updated_at).format(
                                            'MMM DD, YYYY, HH:mm:ss',
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {currency.demonitized_date &&
                                            moment(
                                                currency.demonitized_date,
                                            ).format('MMM DD, YYYY')}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`./edit/${currency.id}`}>
                                            Edit
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}
