import {
  engraver as EngraverType,
  enumCollectionsCollectableType,
} from '@prisma/client';

import {
  AlgoliaCoinType,
  CoinInputType,
  CollectionInputType,
  CurrencyInputType,
  MintInputType,
  PeriodInputType,
  RulerInputType,
} from '@/global';

export const range = (start: number, end: number): number[] => {
  if (!start || !end) throw new Error('Start and end must be defined');
  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
};

export function engraversSort(a: EngraverType, b: EngraverType) {
  const aParts = a.name.split(' ');
  const bParts = b.name.split(' ');
  return `${aParts.at(-1)} ${aParts.at(0)}`.localeCompare(`${bParts.at(-1)} ${bParts.at(0)}`);
}

export const convertToPrismaCoinCreateInput = (payload: CoinInputType) => {
  let allMints = null;
  if (payload.mints?.length > 0) {
    allMints = {
      create: payload.mints.map((mint) => ({
        mint_id: mint.id,
        created_at: new Date(),
        updated_at: new Date(),
      })),
    };
  }

  return {
    face_value: +payload.faceValue,
    pretty_face_value: payload.prettyFaceValue.trim(),
    series_or_theme_name: payload.seriesOrThemeName?.trim() ? payload.seriesOrThemeName?.trim() : null,
    common_name: payload.commonName.trim(),
    obverse: payload.obverse.trim(),
    reverse: payload.reverse.trim(),
    edge: payload.edge.trim(),
    edge_inscription: payload.edgeInscription?.trim(),
    year_start: payload.yearStart.trim(),
    year_end: payload.yearEnd?.trim() ? payload.yearEnd.trim() : null,
    composition: payload.composition.trim(),
    is_non_circulating: payload.isNifc,
    weight_grams: +payload.weightG,
    diameter_milimeters: +payload.diameterMm,
    comments: payload.comments?.trim() ? payload.comments.trim() : null,
    period_id: payload.period?.id,
    ruler_id: payload.ruler ? payload.ruler.id : null,
    country_id: payload.country ? payload.country.id : null,
    currency_id: payload.currency?.id,
    shape_id: payload.shape?.id,
    numista_number: payload.numistaNumber?.trim(),
    is_bullion: payload.isBullion,
    coin_mint: allMints,
  };
};

export const convertToPrismaCollectionCreateInput = (payload: CollectionInputType) => ({
  year: payload.year.toString(),
  condition: payload.condition,
  storage: payload.storage,
  collectable_type: enumCollectionsCollectableType.coin,
  paid_amount: +payload.paidAmount,
  sourced_from: payload.sourcedFrom?.trim() ? payload.sourcedFrom.trim() : null,
  sourced_when: payload.sourcedWhen?.trim() ? payload.sourcedWhen.trim() : null,
  is_cleaned: payload.isCleaned,
  is_proof: payload.isProof,
  coin_id: payload.coin.id,
  mint_id: payload.mint?.id,
  purchased_with_currency_id: payload.paidCurrency?.id,
  owner_id: '1',
});

export const convertToPrismaCurrencyCreateInput = (payload: CurrencyInputType) => {
  const resp = {
    name: payload.name.trim(),
    short_name: payload.shortName.trim(),
    years: payload.years.trim(),
    comments: payload.comments?.trim() ? payload.comments.trim() : null,
    display_short_name_at_left: payload.displayShortNameAtLeft ?? true,
    demonitized_date: payload.demonitizedDate?.trim() ? payload.demonitizedDate.trim() : null,
  };
  return resp;
};

export const convertToPrismaMintCreateInput = (payload: MintInputType) => {
  return {
    years: payload.years.trim(),
    mint: payload.mint.trim(),
    mark: payload.mark ? payload.mark.trim() : null,
    mark_description: payload.location,
  };
};

export const convertToPrismaPeriodCreateInput = (payload: PeriodInputType) => {
  return {
    years: payload.years.trim(),
    name: payload.period.trim(),
  };
};

export const convertToPrismaRulerCreateInput = (payload: RulerInputType) => {
  return {
    years: payload.years.trim(),
    house: payload.house.trim(),
    name: payload.ruler.trim(),
  };
};

export const rewriteForAlgolia = (coins: AlgoliaCoinType[]) => {
  const managed = coins.map((coin: AlgoliaCoinType) => {
    const {
      id,
      common_name,
      pretty_face_value,
      obverse,
      reverse,
      composition,
      series_or_theme_name,
      year_start,
      year_end,
      image,
    } = coin;
    return {
      objectID: id,
      common_name,
      pretty_face_value,
      obverse,
      reverse,
      composition,
      series_or_theme_name,
      year_start,
      year_end: year_end ?? year_start,
      images: image,
      country: coin.country?.name,
      cc: coin.country?.iso_3166_alpha_2,
      currency: coin.currency?.name,
      shape: coin.shape?.name,
    };
  });
  return managed;
};

export const getIdFromPath = (pathname: string): number | null => {
  const parts = pathname.split('/');
  const id = parts.at(-1);
  if (id && isNaN(id as any)) {
    return null;
  } else return +(id as string);
};
