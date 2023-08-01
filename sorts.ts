import { country as CountryType, currency as CurrencyType } from "@prisma/client";

export const CountryShortNameSort = (a: CountryType, b: CountryType) =>
    a.short_name
        .toLocaleLowerCase()
        .localeCompare(b.short_name.toLocaleLowerCase());

export const CurrencyShortNameSort = (a: CurrencyType, b: CurrencyType) =>
    a.short_name
        .toLocaleLowerCase()
        .localeCompare(b.short_name.toLocaleLowerCase());
