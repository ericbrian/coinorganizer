import {
    Container,
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableRow,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function page() {
    return (
        <Container>
            <Box>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Lists Management
                </Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Country
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/country/view'}>
                                        View
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/country/add'}>New</Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/country/edit'}>
                                        Edit
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Currency
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/currency/view'}>
                                        View
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/currency/add'}>
                                        New
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/currency/edit'}>
                                        Edit
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Engraver/Designer
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/engraver/view'}>
                                        View
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/engraver/add'}>
                                        New
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/engraver/edit'}>
                                        Edit
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Mint
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/mint/view'}>View</Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/mint/add'}>New</Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/mint/edit'}>Edit</Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Period
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/period/view'}>
                                        View
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/period/add'}>New</Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/period/edit'}>
                                        Edit
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Ruler
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/ruler/view'}>View</Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/ruler/add'}>New</Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/ruler/edit'}>Edit</Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Shape
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/shape/view'}>View</Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/shape/add'}>New</Link>
                                </TableCell>
                                <TableCell align="center">
                                    <Link href={'/admin/shape/edit'}>Edit</Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}
