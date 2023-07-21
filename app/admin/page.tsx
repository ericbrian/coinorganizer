import { Container, Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function page() {
    return (
        <Container>
            <Box>
                <Typography
                    variant="h4"
                    style={{ fontWeight: 'bold' }}
                    gutterBottom
                >
                    Lists Management
                </Typography>

                <Typography variant="h6">
                    &nbsp;&middot;&nbsp;{' '}
                    <Link href={'/admin/country/view'}>Country</Link>{' '}
                    &nbsp;&middot;&nbsp;{' '}
                    <Link href={'/admin/currency/view'}>Currency</Link>{' '}
                    &nbsp;&middot;&nbsp;{' '}
                    <Link href={'/admin/engraver/view'}>Engraver/Designer</Link>{' '}
                    &nbsp;&middot;&nbsp;{' '}
                    <Link href={'/admin/mint/view'}>Mint</Link>{' '}
                    &nbsp;&middot;&nbsp;{' '}
                    <Link href={'/admin/period/view'}>Period</Link>{' '}
                    &nbsp;&middot;&nbsp;{' '}
                    <Link href={'/admin/ruler/view'}>Ruler</Link>{' '}
                    &nbsp;&middot;&nbsp;{' '}
                    <Link href={'/admin/shape/view'}>Shape</Link>{' '}
                    &nbsp;&middot;&nbsp;{' '}
                </Typography>
            </Box>
        </Container>
    );
}
