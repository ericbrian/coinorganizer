import appconfig from "@/appconfig";
import { CurrencyInputType } from "@/global";

//* Currencies

export const getCurrencyList = async () => {
    const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/currencies`;
    try {
        const res = await fetch(endpoint);
        return res.json();
    } catch (error) {
        console.error(error);
    }
    return [];
};
export const saveNewCurrency = async (payload: CurrencyInputType) => {
    const currency = await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/currency`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return currency;
};
