//* Collection

import appconfig from "@/appconfig";
import { CollectionInputType } from "@/global";

export const saveCoinInCollection = async (payload: CollectionInputType) => {
    const coin = await fetch(`${appconfig.envs.dev.clientBaseUrl}/api/collection`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return coin;
};

export const getUserCollectionItems = async () => {
    return await fetch(`${appconfig.envs.dev.clientBaseUrl}/api/collection`).then((res) => res.json());
}
