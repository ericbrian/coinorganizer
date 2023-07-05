import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import {
  engraver as engraverDb,
} from "@prisma/client";
import { CoinInput } from "@/global";

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
