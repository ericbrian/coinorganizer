import appconfig from "@/appconfig";
import { RulerInputType } from "@/global";

//* Rulers

export const getRulerList = async () => {
  const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/rulers`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const persistRuler = async (payload: RulerInputType) => {
  const coin = await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/ruler`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return coin;
};
