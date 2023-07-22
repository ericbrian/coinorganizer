'use client';

import { getCountryList } from '@/http/country';
import {
    Container,
    Box,
    Typography,
    Autocomplete,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { country as CountryType } from '@prisma/client';
import React, { FormEvent, useEffect, useState } from 'react';

export default function page() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [parent, setParent] = useState<CountryType | null>(null);
    const [isActive, setIsActive] = useState(true);

    const [countryList, setCountryList] = useState<CountryType[]>([]);

    useEffect(() => {
        getCountryList().then((data) => {
            setCountryList(data);
        });
    }, []);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
    }

    return (
        <Container>
            <Box>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Country - Create
                </Typography>
                {isLoaded && <div>Loading...</div>}
                {!isLoaded && (
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            label="Official Name"
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
                            label="Short Name"
                            onChange={(e) => setShortName(e.target.value)}
                            required
                            variant="outlined"
                            color="secondary"
                            type="text"
                            value={shortName}
                            fullWidth
                            sx={{ mb: 3 }}
                        />
                        <Autocomplete
                            disablePortal
                            id="country-select"
                            options={countryList}
                            value={parent}
                            defaultValue={parent}
                            onChange={(_e, value) => {
                                if (value) {
                                    setParent(value);
                                } else {
                                    setParent(null);
                                }
                            }}
                            sx={{ width: 700 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Parent Country" />
                            )}
                            getOptionLabel={(option) => option.short_name}
                            renderOption={(
                                props: object,
                                option: CountryType,
                                state: object,
                            ) => (
                                <div {...props} key={option.id}>
                                    {option.short_name}
                                </div>
                            )}
                        />
                        <div>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Is Active"
                                onChange={() => setIsActive(!isActive)}
                                checked={isActive}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </Button>
                    </form>
                )}
            </Box>
        </Container>
    );
}
