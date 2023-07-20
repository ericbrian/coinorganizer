import {
    coin as coinDb,
    country as countryDb,
    country_currency as countryCurrencyDb,
    currency as currencyDb,
    engraver as engraverDb,
    mint as mintDb,
    period as periodDb,
    ruler as rulerDb,
    shape as shapeDb,
    enumCollectionsCollectableType
} from "@prisma/client";
import { type } from "os";

interface EventTarget {
    value: any;
}

type ImageInputType = {
    url: string;
    is_preferred: boolean;
    coin_id: number;
}

type CoinInputType = {
    faceValue: number;
    obverse: string;
    reverse: string;
    edge: string;
    edgeInscription?: string;
    yearStart: string;
    yearEnd?: string;
    prettyFaceValue: string;
    seriesOrThemeName: string;
    commonName: string;
    composition: string;
    weightG: number;
    diameterMm: number;
    isNifc: boolean;
    isBullion: boolean;
    numistaNumber: string;
    comments: string;
    country: countryDb;
    currency: currencyDb;
    shape: shapeDb;
    ruler: rulerDb;
    period: periodDb;
    mints: mintDb[];
    obverseEngravers: engraverDb;
    reverseEngravers: engraverDb;
};

type CollectionInputType = {
    coin: coinDb;
    collectableType: enumCollectionsCollectableType;
    year: string;
    mint: mintDb;
    paidCurrency: currencyDb
    paidAmount: number;
    sourcedFrom: string;
    sourcedWhen: string;
    condition: string;
    storage: string;
    isCleaned: boolean;
    isProof: boolean;
};

type SparseCountryListType = {
    id: number;
    short_name: string;
};

type EngraverInputType = {
    name: string;
    comments: string;
};
