import appconfig from "@/appconfig";

//* Currencies

export const getCurrencyList = async () => {
  const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/currencies`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};

// export const createCurrency = async (currency: CurrencyType) =>
//   (await axios.post(`${httpConfig.baseUrl}/currency`, currency)).data.data;
// export const getCurrencyByCountryList = async (country_id: number) =>
//   (await axios.get(`${httpConfig.baseUrl}/currenciesbycountry/${country_id}`))
//     .data.data;
