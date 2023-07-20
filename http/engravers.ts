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
