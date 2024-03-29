import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { useSearchParams } from 'next/navigation'

import { coin as dbCoin, image as dbImage } from "@prisma/client";

type LatestCoins = (dbCoin & { image: dbImage[] })[];

export async function GET(req: NextRequest) {
  const cc = req.nextUrl.searchParams.get("cc")

  const userEmail = "asdf@asdf.zzz";

  const findOptions: Prisma.collectionFindManyArgs = {
    orderBy: [
      {
        coin: {
          face_value: 'asc'
        }
      },
      {
        year: 'asc'
      },
      {
        coin: {
          common_name: 'asc'
        }
      },
    ],
    include: {
      coin: {
        include: {
          country: true,
          image: true,
        }
      },
      users: {
        where: {
          email: {
            equals: userEmail,
          }
        }
      },
      currency: true,
    },
  };

  if (cc?.length === 2)
    findOptions.where = { coin: { country: { iso_3166_alpha_2: { equals: cc } } } };

  try {
    const items: any = await prisma.collection.findMany(findOptions);

    if (items.length === 0) {
      return NextResponse.json({ message: "No items found." });
    }

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
