'use client';

import { Container, Box, Typography, Button, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';

export default function page() {
    const [ruler, setRuler] = useState('');
    const [house, setHouse] = useState('');
    const [years, setYears] = useState('');

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
    }
    return (
        <Container>
            <Box>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Ruler - Create
                </Typography>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        label="Ruler"
                        onChange={(e) => setRuler(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{ mb: 3, mt: 5 }}
                        fullWidth
                        value={ruler}
                    />
                    <TextField
                        label="House"
                        onChange={(e) => setHouse(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        value={house}
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
