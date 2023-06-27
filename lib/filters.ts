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

export function getFilteredCurrencyList(
  list: currencyDb[],
  selectedCountryId: number
) {
  return list
    .filter((currency: currencyDb) => currency.country_currency.length > 0)
    .filter(
      (currency) =>
        (currency.country_currency as countryCurrencyDb[]).filter(
          (cc: countryCurrencyDb) => cc.country_id == selectedCountryId
        ).length > 0
    );
}

export const getFilteredMintList = (
  list: mintDb[],
  selectedCountryId: number
) => list.filter((mint: mintDb) => mint.country_id === selectedCountryId);

export function getFilteredRulerList(
  list: rulerDb[],
  selectedCountryId: number
) {
  return list
    .filter((ruler: rulerDb) => ruler.ruler_country.length > 0)
    .filter(
      (ruler: rulerDb) =>
        ruler.ruler_country.filter(
          (cc: countryCurrencyDb) => cc.country_id == selectedCountryId
        ).length > 0
    );
}

export const getFilteredPeriodList = (
  list: periodDb[],
  selectedCountryId: number
) => list.filter((period: periodDb) => period.country_id === selectedCountryId);
