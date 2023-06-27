import appconfig from "@/appconfig";

//* Engravers

export const getEngraversList = async () => {
  const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/engravers`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};

// export const createEngraver = async (engraver: DesignerType) => (await axios.post(`${httpConfig.baseUrl}/engraver`, engraver)).data.data;
