import { getEngraversList } from '@/http/engravers';
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
import { engraver as EngraverType } from '@prisma/client';
import moment from 'moment';
import React from 'react';

export default async function page() {
    const engravers: EngraverType[] = await getEngraversList();

    return (
        <Container>
            <Box>
                <Typography variant="body2" gutterBottom>
                    <Link href="../">&lt;&lt;&lt; Go Back</Link>
                </Typography>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Engraver/Designer List
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <Link href="/admin/country/create">
                        Create new Engraver/Designer
                    </Link>
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Comments</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                                <TableCell>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {engravers.map((engraver) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {engraver.id}
                                    </TableCell>
                                    <TableCell>{engraver.name}</TableCell>
                                    <TableCell>{engraver.comments}</TableCell>
                                    <TableCell>
                                        {moment(engraver.created_at).format(
                                            'MMM DD, YYYY, HH:mm:ss',
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {moment(engraver.updated_at).format(
                                            'MMM DD, YYYY, HH:mm:ss',
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`./edit/${engraver.id}`}>
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
