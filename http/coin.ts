import appconfig from "@/appconfig";
import { CoinInputType, ImageInputType } from "@/global";
import { coin as CoinType } from "@prisma/client";

//* Coin

export async function getCoins(max_coins: number) {
    const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/coins/latest?max=${max_coins}`;
    const res = await fetch(endpoint, { next: { revalidate: 600 } });

    if (!res.ok) {
        console.log(res);
    }
    return await res.json();
}

export const saveNewCoin = async (payload: CoinInputType) => {
    const coin = await fetch(`${appconfig.envs.dev.clientBaseUrl}/api/coin`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return coin;
};

export const addImageToCoin = async (payload: ImageInputType) => {
    const image = await fetch(`${appconfig.envs.dev.clientBaseUrl}/api/coin/add-image`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });
    return image;
};

export const getCoinById = async (coinId: number) => {
    const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/coin/${coinId}`;
    const res = await fetch(endpoint);
    if (!res.ok) {
        console.log(res);
    }
    return res.json();
}

export const getCoinsForCountry = async (countryId: number): Promise<CoinType[]> => {
    const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/coins/country/${countryId}`;
    console.log(endpoint)
    const res = await fetch(endpoint);
    if (!res.ok) {
        console.log(res);
    }
    return res.json();
}
