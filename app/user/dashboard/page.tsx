'use client';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Box, Container } from '@mui/material';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { getUserCollectionCountries } from '@/http/collection';
import amcolors from './amcolors';
import { collection as CollectionItemType } from '@prisma/client';
import { CollapsedCollectionType, CollapsedCostsType } from '@/global';
import { useEffect, useState } from 'react';

export default function MyCoins() {
    const [costInfos, setCostInfos] = useState('');
    const [collapsedInfo, setCollapsedInfo] = useState<CollapsedCollectionType>(
        {},
    );

    function financial(x: string) {
        return Number.parseFloat(x).toFixed(2);
    }

    const collapseCollectionData = (collectionItems: CollectionItemType[]) => {
        const countryInfos: CollapsedCollectionType = {};
        const paidInfos: CollapsedCostsType = {};

        collectionItems.forEach((item) => {
            const cc = item.coin.country.iso_3166_alpha_2;
            if (!countryInfos.hasOwnProperty(cc)) {
                countryInfos[cc] = {
                    countryCode: cc,
                    countryCodeCount: 1,
                };
            } else {
                countryInfos[cc].countryCodeCount += 1;
            }

            const currency = `${item.currency.name} (${item.currency.short_name})`;
            const cost = item.paid_amount;
            if (!paidInfos.hasOwnProperty(currency)) {
                paidInfos[currency] = cost ? +cost : 0;
            } else {
                paidInfos[currency] += cost ? +cost : 0;
            }
        });

        const costInfoString = Object.keys(paidInfos)
            .map((key) => {
                return `${key} ${financial(paidInfos[key])}`;
            })
            .join(', ');

        setCostInfos(costInfoString);
        console.log({ countryInfos });
        setCollapsedInfo(countryInfos);
    };

    useEffect(() => {
        if (Object.keys(collapsedInfo).length > 0) setMap();
    }, [collapsedInfo]);

    useEffect(() => {
        getUserCollectionCountries()
            .then((data: CollectionItemType[]) => {
                collapseCollectionData(data);
            })
            .catch(() => {});
    }, []);

    const setMap = () => {
        // Create root and chart
        var root = am5.Root.new('chartdiv');

        // Set themes
        root.setThemes([am5themes_Animated.new(root)]);

        var chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: 'rotateX',
                projection: am5map.geoNaturalEarth1(),
            }),
        );

        // Create polygon series
        var polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow,
                exclude: ['AQ'],
            }),
        ); // exclude Antarctica

        polygonSeries.mapPolygons.template.setAll({
            tooltipText: '{name}',
            templateField: 'polygonSettings',
        });

        polygonSeries.mapPolygons.template.states.create('hover', {
            fill: am5.color(0x677935),
        });

        // Set infos from the User's collection
        const cc = Object.keys(collapsedInfo);
        const seriesInfo = cc.map((code, index) => {
            return {
                id: code,
                polygonSettings: {
                    fill: am5.color(amcolors[index]),
                },
            };
        });
        polygonSeries.data.setAll(seriesInfo);
    };

    return (
        <Container>
            <Box>
                <h1>My Coins</h1>
                <div>Cost of coins: {costInfos}.</div>
                <div
                    id="chartdiv"
                    style={{ width: '100%', height: '500px' }}
                ></div>
            </Box>
        </Container>
    );
}
