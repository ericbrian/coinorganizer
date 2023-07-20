import { country as CountryType } from "@prisma/client";

export const CountryShortNameSort = (a: CountryType, b: CountryType) =>
    a.short_name
        .toLocaleLowerCase()
        .localeCompare(b.short_name.toLocaleLowerCase());
