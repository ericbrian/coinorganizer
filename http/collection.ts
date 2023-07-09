//* Collection

import appconfig from "@/appconfig";
import { CollectionInput } from "@/global";

export const saveCoinInCollection = async (payload: CollectionInput) => {
    const coin = await fetch(`${appconfig.envs.dev.clientBaseUrl}/api/collection`, {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return coin;
};
