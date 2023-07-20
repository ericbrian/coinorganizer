import appconfig from "@/appconfig";

//* Periods

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
