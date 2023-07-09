import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import {
  Prisma,
  coin as coinDb,
  country as countryDb,
  currency as currencyDb,
  engraver as engraverDb,
  mint as mintDb,
  period as periodDb,
  ruler as rulerDb,
  shape as shapeDb,
  coin_mint as coinMintDb,
  enumCollectionsCollectableType,
} from "@prisma/client";

import { CoinInput, CollectionInput } from "@/global";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function engraversSort(a: engraverDb, b: engraverDb) {
  const aParts = a.name.split(" ");
  const bParts = b.name.split(" ");
  return `${aParts.at(-1)} ${aParts.at(0)}`.localeCompare(
    `${bParts.at(-1)} ${bParts.at(0)}`
  );
}

export const convertToPrismaCoinCreateInput = (payload: CoinInput) => {
  let allMints = null;
  if (payload.mints?.length > 0) {
    allMints = {
      create: payload.mints.map(mint => ({
        mint_id: mint.id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    }
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
    coin_mint: allMints
  }
}

export const convertToPrismaCollectionCreateInput = (payload: CollectionInput) => ({
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
  owner_id: 1,
});

export function range(start: number, end: number): number[] {
  if (start === end) return [start];
  return [start, ...range(start + 1, end)];
}

export const getPossibleMints = (coin: coinDb): mintDb[] => coin.coin_mint?.map((coinMint: coinMintDb) => coinMint.mint) ?? [];
