import { getPeriodList } from '@/http/period';
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
import { period as PeriodType } from '@prisma/client';
import moment from 'moment';
import React from 'react';

export default async function page() {
    const periods: PeriodType[] = await getPeriodList();

    return (
        <Container>
            <Box>
                <Typography variant="body2" gutterBottom>
                    <Link href="../">&lt;&lt;&lt; Go Back</Link>
                </Typography>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Period List
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <Link href="/admin/country/create">Create new Period</Link>
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Period</TableCell>
                                <TableCell>Years</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                                <TableCell>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {periods.map((period) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {period.id}
                                    </TableCell>
                                    <TableCell>{period.name}</TableCell>
                                    <TableCell>{period.years}</TableCell>
                                    <TableCell>
                                        {moment(period.created_at).format(
                                            'MMM DD, YYYY, HH:mm:ss',
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {moment(period.updated_at).format(
                                            'MMM DD, YYYY, HH:mm:ss',
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`./edit/${period.id}`}>
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
