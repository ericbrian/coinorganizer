export const CoinImageSort = (a: CoinImageType, b: CoinImageType) =>
    a.is_preferred ? -1 : b.is_preferred ? 1 : a.id > b.id ? 1 : -1;

export const CountryShortNameSort = (a: CountryType, b: CountryType) =>
    a.short_name.toLocaleLowerCase().localeCompare(b.short_name.toLocaleLowerCase());

export const CoinCommonNameSort = (a: CoinType, b: CoinType) =>
    a.common_name?.toLocaleLowerCase().localeCompare(b.common_name?.toLocaleLowerCase());

export const CoinCountryNameSort = (a: CoinType, b: CoinType) =>
    a.Country.name.toLocaleLowerCase().localeCompare(b.Country.name.toLocaleLowerCase());

export const CoinCountryShortNameSort = (a: CoinType, b: CoinType) =>
    a.Country.short_name.toLocaleLowerCase().localeCompare(b.Country.short_name.toLocaleLowerCase());

export const CoinStartYearSort = (a: CoinType, b: CoinType) =>
    a.year_start?.toLocaleLowerCase().localeCompare(b.year_start?.toLocaleLowerCase());

export const CoinNominalValueSort = (a: CoinType, b: CoinType) => a.face_value - b.face_value;

export const MintageSort = (a: CheckListCoinType, b: CheckListCoinType) => {
    const nameA = a.mintage || 999999999;
    const nameB = b.mintage || 999999999;
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    return 0;
}

export const CurrencyNameSort = (a: CurrencyType, b: CurrencyType) =>
    a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase());

export const NameSort = (a: CheckListCoinType, b: CheckListCoinType) =>
    a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase());

// Collection Type Searches
export const CollectionCoinPurchaseDateSort = (a: CollectionType, b: CollectionType) => {
    if (!a.sourced_when || !b.sourced_when)
        return 0;
    return a.sourced_when.localeCompare(b.sourced_when);
};

export const CollectionCoinPurchaseAmountSort = (a: CollectionType, b: CollectionType) => {
    const a_amount: number = a.paid_amount;
    const b_amount: number = b.paid_amount;
    return a_amount < b_amount ? 1 : -1;
};

export const CollectionCoinYearSort = (a: CollectionType, b: CollectionType) => {
    if (!a || !a.year || !b || !b.year)
        return 0;
    const aInt = +a.year.match(/\d+/);
    const bInt = +b.year.match(/\d+/);
    return aInt < bInt ? -1 : 1;
};

export const CollectionCoinCountrySort = (a: CollectionType, b: CollectionType) => {
    return a.Coin.Country.short_name?.localeCompare(b.Coin.Country.short_name);
};

export const CollectionCoinSellerSort = (a: CollectionType, b: CollectionType) => {
    if (!a.sourced_from || !b.sourced_from)
        return 0;
    return a.sourced_from.localeCompare(b.sourced_from);
};

//
export const YearSort = (a: CheckListCoinType, b: CheckListCoinType) =>
    a.year.toLocaleLowerCase().localeCompare(b.year.toLocaleLowerCase());

export const MintSort = (a: MintType, b: MintType) =>
    a.mint.localeCompare(b.mint);

export const YearsSort = (a: CurrencyType, b: CurrencyType) =>
    a.years.toLocaleLowerCase().localeCompare(b.years.toLocaleLowerCase());

export const FullNameSort = (a: DesignerType, b: DesignerType) => {
    const nameA = a.name.split(" ").findLast(() => true) + a.name;
    const nameB = b.name.split(" ").findLast(() => true) + b.name;
    return nameA.toLocaleLowerCase().localeCompare(nameB.toLocaleLowerCase());
};
