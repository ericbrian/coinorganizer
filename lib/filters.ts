import {
  country as countryDb,
  country_currency as countryCurrencyDb,
  country_mint as countryMintDb,
  currency as currencyDb,
  engraver as engraverDb,
  mint as mintDb,
  period as periodDb,
  ruler as rulerDb,
  shape as shapeDb,
} from "@prisma/client";

export const getFilteredCurrencyList = (
  list: currencyDb[],
  selectedCountryId: number
) =>
  list
    .filter((currency: currencyDb) => currency.country_currency.length > 0)
    .filter(
      (currency) =>
        (currency.country_currency as countryCurrencyDb[]).filter(
          (cc: countryCurrencyDb) => cc.country_id == selectedCountryId
        ).length > 0
    );

export const getFilteredMintList = (
  list: mintDb[],
  selectedCountryId: number
) =>
  list
    .filter((mint: mintDb) => mint.country_mint.length > 0)
    .filter((mint: mintDb) => mint.country_mint.filter(
      (cc: countryMintDb) => cc.country_id == selectedCountryId).length > 0
    );

export const getFilteredRulerList = (
  list: rulerDb[],
  selectedCountryId: number
) =>
  list
    .filter((ruler: rulerDb) => ruler.ruler_country.length > 0)
    .filter(
      (ruler: rulerDb) =>
        ruler.ruler_country.filter(
          (cc: countryCurrencyDb) => cc.country_id == selectedCountryId
        ).length > 0
    );

export const getFilteredPeriodList = (
  list: periodDb[],
  selectedCountryId: number
) =>
  list.filter((period: periodDb) => period.country_id === selectedCountryId);
