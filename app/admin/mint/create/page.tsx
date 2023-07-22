'use client';

import { Container, Box, Typography, Button, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';

export default function page() {
    const [mint, setMint] = useState('');
    const [location, setLocation] = useState('');
    const [mark, setMark] = useState('');
    const [years, setYears] = useState('');

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
    }

    return (
        <Container>
            <Box>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Mint - Create
                </Typography>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        label="Mint"
                        onChange={(e) => setMint(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{ mb: 3, mt: 5 }}
                        fullWidth
                        value={mint}
                    />
                    <TextField
                        label="Location"
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        value={location}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        label="Mark"
                        onChange={(e) => setMark(e.target.value)}
                        variant="outlined"
                        color="secondary"
                        type="text"
                        value={mark}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        label="Years"
                        onChange={(e) => setYears(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        value={years}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
