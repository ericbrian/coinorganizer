'use client';

import { Container, Box } from '@mui/material';
import { useParams } from 'next/navigation';
import React from 'react';

export default function page() {
    const params = useParams();
    const countryCode = params.cc;

    return (
        <Container>
            <Box>
                <div>{countryCode}</div>
            </Box>
        </Container>
    );
}
