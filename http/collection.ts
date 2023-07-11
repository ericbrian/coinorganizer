//* Collection

import appconfig from "@/appconfig";
import { CollectionInput } from "@/global";
import { collection as collectionDb } from "@prisma/client";

export const saveCoinInCollection = async (payload: CollectionInput) => {
    const coin = await fetch(`${appconfig.envs.dev.clientBaseUrl}/api/collection`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return coin;
};

export const getUserCollectionItems = async () => {
    return await fetch(`${appconfig.envs.dev.clientBaseUrl}/api/collection`).then((res) => res.json());
}
