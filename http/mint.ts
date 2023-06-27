import appconfig from "@/appconfig";

//* Mints

export const getMintList = async () => {
  const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/mints`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};

// export const createMint = async (mint: MintType) => (await axios.post(`${httpConfig.baseUrl}/mint`, mint)).data.data;
// export const getMintsByCountryList = async (country_id: number) => (await axios.get(`${httpConfig.baseUrl}/mintsbycountry/${country_id}`)).data.data;
