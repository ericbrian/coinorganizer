import { convertToPrismaCoinCreateInput } from "@/utils";

import algoliasearch from 'algoliasearch';
import { rewriteForAlgolia } from "@/utils";

import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import appconfig from "@/appconfig";

export async function POST(req: Request) {
  const payload = await req.json();

  let coin = null;
  try {
    const data = convertToPrismaCoinCreateInput(payload);
    coin = await prisma.coin.create({ data });
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    throw e
  }

  if (coin) {
    try {
      const client = algoliasearch(appconfig.algolia.appId, appconfig.algolia.writeApiKey);
      const index = client.initIndex(appconfig.algolia.indexName);
      const managed = rewriteForAlgolia([coin]);
      index.addObject(managed);
    }
    catch (e) {
      console.log(e);
    }
  }

  return {
    status: 200,
    body: coin,
  };
}
