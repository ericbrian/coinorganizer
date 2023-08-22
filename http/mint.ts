import appconfig from "@/appconfig";
import { MintInputType } from "@/global";

//* Mints

export const getMintList = async () => {
  const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/mints`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getMintsForCountry = async (countryId: number) => {
  const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/mints/country/${countryId}`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const persistMint = async (payload: MintInputType) => {
  const coin = await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/mint`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return coin;
};
