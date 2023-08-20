import appconfig from "@/appconfig";
import { CurrencyInputType } from "@/global";
import { currency as CurrencyType } from "@prisma/client";

//* Currencies

export const getCurrencyList = async (): Promise<CurrencyType[]> => {
  const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/currencies`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};
export const persistCurrency = async (payload: CurrencyInputType) => {
  const currency = await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/currency`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return currency;
};

export const getCurrencyById = async (id: number): Promise<CurrencyType | null> => {
  const currency = await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/currency/${id}`, {
    method: 'GET'
  });
  return currency.json();
};
