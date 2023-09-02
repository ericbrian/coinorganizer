import appconfig from "@/appconfig";
import { PeriodInputType } from "@/global";

//* Periods

export const createPeriod = async (payload: PeriodInputType) => {
  const period = await fetch(`${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/period`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return period;
};

export const getPeriodList = async () => {
  const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/periods`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};
