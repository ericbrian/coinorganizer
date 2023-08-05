'use client';

import HomePageCoinDetail from '@/app/components/HomePageCoinDetail';
import { getUserCollectionCountries } from '@/http/collection';
import { Container, Box, Typography, Link } from '@mui/material';
import { collection as CollectionType } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function page() {
    const params = useParams();
    const countryCode = (params.cc as string) || null;

    const [countryName, setCountryName] = useState(params.cc as string);
    const [collectionItems, setCollectionItems] = useState<CollectionType[]>(
        [],
    );

    useEffect(() => {
        getUserCollectionCountries(countryCode).then(
            (data: CollectionType[]) => {
                if (data) {
                    setCountryName(data[0].coin.country.short_name);
                }
                setCollectionItems(data);
            },
        );
    }, []);

    return (
        <Container>
            <Box>
                <Typography variant="body2" gutterBottom>
                    <Link href="../">&lt;&lt;&lt; Go Back</Link>
                </Typography>
                <Typography variant="h6">Your Coins by Country</Typography>
                <Typography variant="h4" gutterBottom>
                    {countryName}
                </Typography>
                {collectionItems.map((item) => {
                    return (
                        <HomePageCoinDetail coin={item.coin} key={item.id} />
                    );
                })}
            </Box>
        </Container>
    );
}
