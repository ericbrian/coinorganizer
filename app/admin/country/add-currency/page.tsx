'use client';

import { Container, Box, Typography, Link } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { addImageToCoin } from '@/http/coin';
import {
    Prisma,
    currency as CurrencyType,
    country as CountryType,
} from '@prisma/client';
import { getCurrencyList } from '@/http/currency';
import { getCountryList } from '@/http/country';
import { CountryShortNameSort, CurrencyShortNameSort } from '@/sorts';

interface EventTarget {
    id: any;
    appendChild: any;
}

export default function page() {
    const [countries, setCountries] = useState<CountryType[]>([]);
    const [currencies, setCurrencies] = useState<CurrencyType[]>([]);

    useEffect(() => {
        getCountryList()
            .then((res) => {
                res.sort(CountryShortNameSort);
                setCountries(res);
            })
            .catch((e) => {});
        getCurrencyList()
            .then((res) => {
                res.sort(CurrencyShortNameSort);
                setCurrencies(res);
            })
            .catch((e) => {});
    }, []);

    const save = async (payload: any) => {
        addImageToCoin(payload)
            .then((res) => {
                document.getElementById('image-div-' + payload.url)?.remove();
            })
            .catch((e) => {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    const target = e.meta?.target;
                    // The .code property can be accessed in a type-safe manner
                    if (e.code === 'P2002') {
                        console.log(
                            `There is a unique constraint violation, a new coin cannot be created in field ${target}.`,
                        );
                    }
                }
                throw e;
            });
    };

    const allowDrop = (e: any) => e.preventDefault();

    const drag = (e: React.DragEvent) => {
        const eventTarget: EventTarget = e.target as unknown as EventTarget;
        e.dataTransfer?.setData('text', eventTarget.id);
    };

    const drop = (e: React.DragEvent) => {
        e.preventDefault();

        const eventTarget: EventTarget = e.target as unknown as EventTarget;

        const coinId = eventTarget.id.split('-').at(-1);
        const preferred =
            eventTarget.id.split('-').at(-2) === 'PREFERRED' ? true : false;
        const data = e.dataTransfer?.getData('text');

        if (coinId && data) {
            eventTarget.appendChild(document.getElementById(data));
            save({
                coin_id: +coinId,
                url: data,
                is_preferred: preferred,
            });
        } else {
            throw new Error('coinId or data is null');
        }
    };

    const cointainerStyle = {
        display: 'inline-block',
        height: '60px',
        width: '160px',
        margin: '1px',
        padding: '2px',
        border: '1px solid black',
        backgroundColor: 'lightgray',
    };

    return (
        <>
            <Container>
                <Box>
                    <Typography variant="body2" gutterBottom>
                        <Link href="../">&lt;&lt;&lt; Go Back</Link>
                    </Typography>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                        Add Currencies to Countries
                    </Typography>
                </Box>
            </Container>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    {currencies.length > 0 &&
                        currencies.map((currency) => (
                            <div
                                key={currency.id}
                                style={{
                                    ...cointainerStyle,
                                    cursor: `move`,
                                    backgroundColor: 'lightgreen',
                                    whiteSpace: 'nowrap',
                                    height: '30px',
                                }}
                                id={'currency-id-' + currency.id}
                                onDragStart={(e) => drag(e)}
                                draggable="true"
                            >
                                {currency.name}
                            </div>
                        ))}
                </Grid>
                <Grid xs={6}>
                    {countries.length > 0 &&
                        countries.map((country) => (
                            <div
                                key={country.id}
                                id={'country-id-' + country.id}
                                style={cointainerStyle}
                                onDrop={(e) => drop(e)}
                                onDragOver={(e) => allowDrop(e)}
                            >
                                {country.name}
                            </div>
                        ))}
                </Grid>
            </Grid>
        </>
    );
}
