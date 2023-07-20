import appconfig from '@/appconfig';
import { escapedNewLineToLineBreakTag } from '@/utils';
import { Container, Box, Grid, Typography, CardMedia } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export default function page() {
    return (
        <Container>
            <Box>
                <Grid container spacing={2}>
                    <Grid xs={4} style={{ textAlign: 'center' }}>
                        <Typography
                            variant="body1"
                            style={{ fontWeight: 'bold' }}
                        >
                            Views
                        </Typography>
                        - Item 1
                    </Grid>
                    <Grid xs={4} style={{ textAlign: 'center' }}>
                        <Typography
                            variant="body1"
                            style={{ fontWeight: 'bold' }}
                        >
                            Create/Edit
                        </Typography>
                        - Item 2
                    </Grid>
                    <Grid xs={4} style={{ textAlign: 'center' }}>
                        &nbsp;
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
