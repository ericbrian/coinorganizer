'use client';

import { getCountryById, getCountryList } from '@/http/country';
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
import { usePathname, useSearchParams } from 'next/navigation';

const getIdFromPath = (pathname: string): number | null => {
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];
    if (isNaN(id as any)) {
        return null;
    }
    return parseInt(id, 10);
};

export default function AddCountry() {
    const pathname = usePathname();

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [parent, setParent] = useState<CountryType | null>(null);
    const [isActive, setIsActive] = useState(true);
    const [editId, setEditId] = useState<number | null>(null);
    const [editedCountry, setEditedCountry] = useState<CountryType | null>(
        null,
    );

    const [countryList, setCountryList] = useState<CountryType[]>([]);

    useEffect(() => {
        getCountryList().then((data) => {
            setCountryList(data);
            setEditId(getIdFromPath(pathname));

            if (!editId) {
                setIsLoading(false);
            }
        });
    }, []);

    useEffect(() => {
        if (editId) {
            getCountryById(editId).then((data) => {
                setEditedCountry(data);
                setName(data.name);
                setShortName(data.short_name);
                setParent(data.parent);
                setIsActive(data.is_active);
                setIsLoading(false);
            });
        }
    }, [editId]);

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
    }

    return (
        <Container>
            <Box>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    Country - {editId}
                </Typography>
                {isLoading && <div>Loading...</div>}
                {!isLoading && (
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
