'use client';

import { Container, Box, Typography, Button, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';

export default function page() {
    const [shape, setShape] = useState('');

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
    }
    return (
        <Container>
            <Box>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Shape - Create
                </Typography>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        label="Shape"
                        onChange={(e) => setShape(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{ mb: 3, mt: 5 }}
                        fullWidth
                        value={shape}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
