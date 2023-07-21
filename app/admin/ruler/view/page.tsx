import { getRulerList } from '@/http/ruler';
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
import { ruler as RulerType } from '@prisma/client';
import moment from 'moment';
import React from 'react';

export default async function page() {
    const rulers: RulerType[] = await getRulerList();

    return (
        <Container>
            <Box>
                <Typography variant="body2" gutterBottom>
                    <Link href="../">&lt;&lt;&lt; Go Back</Link>
                </Typography>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Ruler List
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <Link href="/admin/country/create">Create new Ruler</Link>
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Ruler</TableCell>
                                <TableCell>House</TableCell>
                                <TableCell>Years</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                                <TableCell>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rulers.map((ruler) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {ruler.id}
                                    </TableCell>
                                    <TableCell>{ruler.name}</TableCell>
                                    <TableCell>{ruler.house}</TableCell>
                                    <TableCell>{ruler.years}</TableCell>
                                    <TableCell>
                                        {moment(ruler.created_at).format(
                                            'MMM DD, YYYY, HH:mm:ss',
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {moment(ruler.updated_at).format(
                                            'MMM DD, YYYY, HH:mm:ss',
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`./edit/${ruler.id}`}>
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
