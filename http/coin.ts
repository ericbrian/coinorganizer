import appconfig from "@/appconfig";
import { CoinInputType, CoinMintRelationType, ImageInputType } from "@/global";
import { coin as CoinType } from "@prisma/client";

//* Coin

export async function getCoins(max_coins: number) {
    const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/coins/latest?max=${max_coins}`;
    try {
        const res = await fetch(endpoint, { headers: { 'Content-Type': 'application/json' }, next: { revalidate: 600 } });
        if (!res.ok) {
            throw new Error(`Failed to fetch coins. Status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(error);
        // handle error here
    }
}

export const saveNewCoin = async (payload: CoinInputType) => {
    const coin = await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/coin`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return coin;
};

export const addImageToCoin = async (payload: ImageInputType) => {
    const res = await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/coin/add-image`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });
    return res;
};

export const relateMintAndCoin = async (coin_id: number, mint_id: number) => {
    const res = await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/coin/relate-mint`, {
        method: 'POST',
        body: JSON.stringify({ coin_id, mint_id }),
    });
    return res;
};

export const getCoinById = async (coinId: number) => {
    const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/coin/${coinId}`;
    const res = await fetch(endpoint);
    if (!res.ok) {
        throw new Error(`Failed to fetch coin with id ${coinId}. Status: ${res.status}`);
    }
    return res.json();
}

export const getCoinsForCountry = async (countryId: number): Promise<CoinType[]> => {
    const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/coins/country/${countryId}`;
    console.log(endpoint)
    const res = await fetch(endpoint);
    if (!res.ok) {
        console.log(res);
    }
    return res.json();
}
