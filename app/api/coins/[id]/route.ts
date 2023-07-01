import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { coin as dbCoin, image as dbImage } from "@prisma/client";

type LatestCoins = (dbCoin & { image: dbImage[] })[];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const coinId = params.id;

    if (coinId > 0) {
      const coin = await prisma.coin.findFirst({
        where: {
          id: { equals: coinId },
        },
        include: {
          image: true,
          country: true,
          ruler: true,
          period: true,
        },
      });
      return NextResponse.json(coin);
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
