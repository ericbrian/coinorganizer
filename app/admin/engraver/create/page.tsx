'use client';

import { Container, Box, Typography, Button, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';

export default function page() {
    const [engraver, setEngraver] = useState('');
    const [comments, setComments] = useState('');

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <Container>
            <Box>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Engraver/Designer - Create
                </Typography>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        label="Engraver/Designer Name"
                        onChange={(e) => setEngraver(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{ mb: 3, mt: 5 }}
                        fullWidth
                        value={engraver}
                    />
                    <TextField
                        label="Comments"
                        onChange={(e) => setComments(e.target.value)}
                        variant="outlined"
                        color="secondary"
                        type="password"
                        value={comments}
                        fullWidth
                        sx={{ mb: 3 }}
                        multiline
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
