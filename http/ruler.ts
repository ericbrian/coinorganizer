import appconfig from "@/appconfig";

//* Rulers

export const getRulerList = async () => {
    const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/rulers`;
    try {
        const res = await fetch(endpoint);
        return res.json();
    } catch (error) {
        console.error(error);
    }
    return [];
};
