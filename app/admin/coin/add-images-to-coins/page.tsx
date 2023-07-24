'use client';

import { Container, Box, Typography, Link, CardMedia } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import appconfig from '@/appconfig';
import { addImageToCoin } from '@/http/coin';
import allImages from './images.json';
import { Prisma } from '@prisma/client';

export default function page() {
    const [coins, setCoins] = useState<any[]>([]);
    const [images, setImages] = useState<{ url: string }[]>([]);

    useEffect(() => {
        getCoinsWithoutImages()
            .then((res) => {
                setCoins(res);
            })
            .catch((e) => {});
        getImagesNames()
            .then((res) => {
                res.sort((a: any, b: any) => (a < b ? 0 : 1));
                setImages(res);
            })
            .catch((e) => {});
    }, []);

    const filterImages = (
        imagesAlreadyUsed: { url: string }[],
        imagePool: string[],
    ) => {
        let hold = imagePool.filter((r) => !r.endsWith('.mov'));
        const imagesNamesAlreadyUsed = imagesAlreadyUsed.map((r) => r.url);
        imagesNamesAlreadyUsed.forEach((image) => {
            const locatedAt = hold.indexOf(image);
            if (locatedAt > -1) {
                hold.splice(locatedAt, 1);
            }
        });
        return hold;
    };

    const filteredImages = filterImages(images, allImages);

    const saveImageToCoinRecord = (payload: any) => {
        addImageToCoin(payload)
            .then((res) => {
                // Pass, nothing to do
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

    async function getCoinsWithoutImages() {
        const endpoint = `${
            appconfig.envs[process.env.NODE_ENV].clientBaseUrl
        }/api/coins/withoutimages`;
        try {
            const res = await fetch(endpoint);
            return res.json();
        } catch (error) {
            return [];
        }
    }

    async function getImagesNames() {
        const endpoint = `${
            appconfig.envs[process.env.NODE_ENV].clientBaseUrl
        }/api/images/namesonly`;
        try {
            const res = await fetch(endpoint);
            return res.json();
        } catch (error) {
            return [];
        }
    }

    const allowDrop = (e: any) => e.preventDefault();

    const drag = (e: any) => e.dataTransfer.setData('text', e.target.id);

    const drop = (e: any) => {
        e.preventDefault();

        const coinId = e.target.id.split('-')[1];
        const data = e.dataTransfer.getData('text');
        const payload = { coin_id: +coinId, url: data, is_preferred: false };

        console.log({ coinId });
        console.log({ data });
        console.log({ payload: JSON.stringify(payload) });

        if (coinId && data) {
            e.target.appendChild(document.getElementById(data));
            saveImageToCoinRecord(payload);
        } else {
            saveImageToCoinRecord(JSON.stringify(payload));
        }
    };

    return (
        <>
            <Container>
                <Box>
                    <Typography variant="body2" gutterBottom>
                        <Link href="../">&lt;&lt;&lt; Go Back</Link>
                    </Typography>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                        Add Images to Coins
                    </Typography>
                </Box>
            </Container>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    {filteredImages.length > 0 &&
                        filteredImages.map((name) => (
                            <div
                                key={name}
                                style={{
                                    display: 'inline-block',
                                    height: '160px',
                                    width: '160px',
                                    margin: '1px',
                                    padding: '2px',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: 160,
                                        borderRadius: '15px',
                                    }}
                                    image={
                                        appconfig.cdn + '/coin-images/' + name
                                    }
                                    alt={name}
                                    draggable="true"
                                    onDragStart={(e) => drag(e)}
                                />
                            </div>
                        ))}
                </Grid>
                <Grid xs={6}>
                    {coins.length === 0 && <div>no coins</div>}
                    {coins.length > 0 &&
                        coins.map((coin) => (
                            <div
                                key={coin.id}
                                id={'coin-' + coin.id}
                                style={{
                                    display: 'inline-block',
                                    height: '180px',
                                    width: '180px',
                                    border: '1px solid black',
                                    margin: '5px',
                                    padding: '2px',
                                }}
                                onDrop={(e) => drop(e)}
                                onDragOver={(e) => allowDrop(e)}
                            >
                                {coin.country_name}
                                <br />
                                {coin.common_name}, {coin.year_start}-
                                {coin.year_end} ({coin.pretty_face_value}) (#
                                {coin.id})
                            </div>
                        ))}
                </Grid>
            </Grid>
        </>
    );
}
