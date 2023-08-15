import appconfig from "@/appconfig";

//* Shapes

export const getShapeList = async () => {
  const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/shapes`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getShapeById = async (id: number) => {
  const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/shape/${id}`;
  try {
    const res = await fetch(endpoint);
    return res.json();
  } catch (error) {
    console.error(error);
  }
  return {};
}
