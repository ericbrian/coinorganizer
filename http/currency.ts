import appconfig from "@/appconfig";

//* Currencies

export const getCurrencyList = async () => {
    const endpoint = `${appconfig.envs[process.env.NODE_ENV].clientBaseUrl}/api/currencies`;
    try {
        const res = await fetch(endpoint);
        return res.json();
    } catch (error) {
        console.error(error);
    }
    return [];
};
