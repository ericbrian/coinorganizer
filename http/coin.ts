//* Coin

import appconfig from "@/appconfig";
import { CoinInput, ImageInput } from "@/global";
import { coin as coinDb } from "@prisma/client";

// export const getAllCoins = async () =>
//   (await axios.get(`${httpConfig.baseUrl}/coins`)).data.data;
// export const getCoinListData = async (limit = 5) =>
//   (await axios.get(`${httpConfig.baseUrl}/latestcoins/${limit}`)).data.data;
// export const getCoinDataById = async (id: number) =>
//   (await axios.get(`${httpConfig.baseUrl}/coin/${id}`)).data.data;
// export const getCoinsByCountry = async (id: number) =>
//   (await axios.get(`${httpConfig.baseUrl}/coinsbycountry/${id}`)).data.data;
// export const createCoin = async (coin: CreateCoinType) =>
//   (await axios.post(`${httpConfig.baseUrl}/coin`, coin)).data.data;
// export const getCoinsWithoutImages = async () =>
//   (await axios.get(`${httpConfig.baseUrl}/coinsWithoutImages`)).data.data;

export const saveNewCoin = async (payload: CoinInput) => {
    const coin = await fetch(`${appconfig.envs.dev.clientBaseUrl}/api/coin`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return coin;
};

export const addImageToCoin = async (payload: ImageInput) => {
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

export const getCoinsForCountry = async (countryId: number): Promise<coinDb[]> => {
    const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/coins/country/${countryId}`;
    console.log(endpoint)
    const res = await fetch(endpoint);
    if (!res.ok) {
        console.log(res);
    }
    return res.json();
}
