import {
  country as countryDb,
  country_currency as countryCurrencyDb,
  currency as currencyDb,
  engraver as engraverDb,
  mint as mintDb,
  period as periodDb,
  ruler as rulerDb,
  shape as shapeDb,
} from "@prisma/client";

interface EventTarget {
  value: any;
}

type CoinInput = {
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
