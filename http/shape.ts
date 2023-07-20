import appconfig from "@/appconfig";

//* Shapes

export const getShapeList = async () => {
    const endpoint = `${appconfig.envs.dev.clientBaseUrl}/api/shapes`;
    try {
        const res = await fetch(endpoint);
        return res.json();
    } catch (error) {
        console.error(error);
    }
    return [];
};
