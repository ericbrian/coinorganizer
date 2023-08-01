import {
    coin as CoinType,
    country as CountryType,
    country_currency as CountryCurrencyType,
    currency as CurrencyType,
    engraver as EngraverType,
    mint as MintType,
    period as PeriodType,
    ruler as RulerType,
    shape as ShapeType,
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

    country: CountryType;
    currency: CurrencyType;
    shape: ShapeType;
    ruler: RulerType;
    period: PeriodType;
    mints: MintType[];
    obverseEngravers: EngraverType;
    reverseEngravers: EngraverType;
};

type CurrencyInputType = {
    name: string;
    shortName: string;
    years: string;
    comments: string;
    displayShortNameAtLeft: boolean;
    demonitizedDate: string;
}

type CollectionInputType = {
    coin: CoinType;
    collectableType: enumCollectionsCollectableType;
    year: string;
    mint: MintType;
    paidCurrency: CurrencyType
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

type CollapsedCollectionType = {
    [key: string]: CollapsedCollectionDataType;
};

type CollapsedCollectionDataType = {
    countryCode: string;
    countryCodeCount: number;
};

type CollapsedCostsType = {
    [key: string]: CollapsedCostsDataType;
};
