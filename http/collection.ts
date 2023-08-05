//* Collection

import appconfig from "@/appconfig";
import { CollectionInputType } from "@/global";

export const saveCoinInCollection = async (payload: CollectionInputType) => {
    const coin = await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/collection`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return coin;
};

export const getUserCollectionItems = async () => {
    return await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/collection`).then((res) => res.json());
}

export const getUserCollectionCountries = async (cc: string | null = null) => {
    let endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/coins/byuserandcountry`;
    if (cc) endpoint += `?cc=${cc}`;
    return await fetch(endpoint).then((res) => res.json());
}
