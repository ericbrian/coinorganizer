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
import { country as CountryType } from '@prisma/client';
import moment from 'moment';
import React from 'react';

export default async function page() {
    const countries: CountryType[] = await getCountryList();

    return (
        <Container>
            <Box>
                <Typography variant="body2" gutterBottom>
                    <Link href="../">&lt;&lt;&lt; Go Back</Link>
                </Typography>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Country List
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <Link href="/admin/country/create">Create new Country</Link>
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Short Name</TableCell>
                                <TableCell>Parent</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                                <TableCell>Is Active</TableCell>
                                <TableCell>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {countries.map((country) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {country.id}
                                    </TableCell>
                                    <TableCell>{country.name}</TableCell>
                                    <TableCell>{country.short_name}</TableCell>
                                    <TableCell>
                                        {country.territory_of_country_id
                                            ? country.territory_of_country_id
                                            : '--'}
                                    </TableCell>
                                    <TableCell>
                                        {moment(country.created_at).format(
                                            'MMM DD, YYYY, HH:mm:ss',
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {moment(country.updated_at).format(
                                            'MMM DD, YYYY, HH:mm:ss',
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {country.is_active ? 'Yes' : 'No'}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`./edit/${country.id}`}>
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
