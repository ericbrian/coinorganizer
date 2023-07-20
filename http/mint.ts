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
