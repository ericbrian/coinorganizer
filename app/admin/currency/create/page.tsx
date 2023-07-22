'use client';

import { Container, Box, Typography, Button, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function page() {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [years, setYears] = useState('');
    const [demonitizedDate, setDemonitizedDate] = useState('');

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        console.log(name, symbol, years, demonitizedDate);
    }

    return (
        <Container>
            <Box>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Currency - Create
                </Typography>

                <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{ mb: 3, mt: 5 }}
                        fullWidth
                        value={name}
                    />
                    <TextField
                        label="Symbol"
                        onChange={(e) => setSymbol(e.target.value)}
                        variant="outlined"
                        color="secondary"
                        type="text"
                        value={symbol}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        label="Years"
                        onChange={(e) => setYears(e.target.value)}
                        variant="outlined"
                        required
                        color="secondary"
                        type="text"
                        value={years}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Demonitized Date"
                                sx={{ mb: 3 }}
                                value={demonitizedDate}
                                onChange={(value) =>
                                    setDemonitizedDate(
                                        (value as never as dayjs.Dayjs).format(
                                            'YYYY-MM-DDTHH:mm:ssZ',
                                        ),
                                    )
                                }
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Button variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
