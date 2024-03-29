import { country as CountryType } from "@prisma/client";
import { CountryShortNameSort } from "@/sorts";

import appconfig from "@/appconfig";

//* Countries

const sortCountryByShortName = (sort_data: CountryType[]) => {
  const local_list = [...sort_data];
  local_list.sort(CountryShortNameSort);
  return local_list;
};

export const getCountryList = async () => {
  const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/countries`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getCountryById = async (countryId: number) => {
  const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/country/${countryId}`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getCountriesWithCoinsList = async () => {
  const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/countries/with-coins`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};
