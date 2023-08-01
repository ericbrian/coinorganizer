'use client';

import { Container, Box, Typography, Link, CardMedia } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import appconfig from '@/appconfig';
import { addImageToCoin } from '@/http/coin';
import allImages from './images.json';
import { Prisma } from '@prisma/client';

interface EventTarget {
    id: any;
    appendChild: any;
}

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

    const saveImageToCoinRecord = async (payload: any) => {
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
            saveImageToCoinRecord({
                coin_id: +coinId,
                url: data,
                is_preferred: preferred,
            });
        } else {
            throw new Error('coinId or data is null');
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
                                id={'image-div-' + name}
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
                                    id={name}
                                />
                            </div>
                        ))}
                </Grid>
                <Grid xs={6}>
                    {coins.length === 0 && <div>no coins</div>}
                    {coins.length > 0 &&
                        coins.map((coin) => (
                            <div
                                style={{
                                    display: 'inline-block',
                                    border: '1px solid black',
                                    margin: '5px',
                                    padding: '2px',
                                    width: '370px',
                                }}
                            >
                                <div>
                                    {coin.country_name}
                                    <br />
                                    {coin.common_name}, {coin.year_start}-
                                    {coin.year_end} ({coin.pretty_face_value})
                                    (#
                                    {coin.id})
                                </div>
                                <div
                                    key={coin.id}
                                    id={'coin-PREFERRED-' + coin.id}
                                    style={{
                                        display: 'inline-block',
                                        height: '30px',
                                        width: '170px',
                                        border: '1px solid black',
                                        margin: '5px',
                                        padding: '2px',
                                    }}
                                    onDrop={(e) => drop(e)}
                                    onDragOver={(e) => allowDrop(e)}
                                >
                                    PREFERRED
                                </div>
                                <div
                                    key={coin.id}
                                    id={'coin-NOTPREFERRED-' + coin.id}
                                    style={{
                                        display: 'inline-block',
                                        height: '30px',
                                        width: '170px',
                                        border: '1px solid black',
                                        margin: '5px',
                                        padding: '2px',
                                    }}
                                    onDrop={(e) => drop(e)}
                                    onDragOver={(e) => allowDrop(e)}
                                >
                                    NOT PREFERRED
                                </div>
                            </div>
                        ))}
                </Grid>
            </Grid>
        </>
    );
}
