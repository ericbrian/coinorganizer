import { country as CountryDb } from "@prisma/client";
import appconfig from "@/appconfig";
import { CountryShortNameSort } from "@/sorts";

//* Countries

const sortCountryByShortName = (sort_data: CountryDb[]) => {
  const local_list = [...sort_data];
  local_list.sort(CountryShortNameSort);
  return local_list;
};

export const getCountryList = async () => {
  const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/countries`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};
export const getCountriesWithCoinsList = async () => {
  const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/countries/with-coins`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};

// export const getCountryListFromAddedCoins = async () =>
//   (await axios.get(`${httpConfig.baseUrl}/countriesFromAddedCoins`)).data.data;
