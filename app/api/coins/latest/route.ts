import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { coin as dbCoin, image as dbImage } from "@prisma/client";

type LatestCoins = (dbCoin & { image: dbImage[] })[];

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const max = searchParams.get("max") ?? "10";

    const MAX_RESULTS_LIMIT = 10;
    const parsedMax = parseInt(max, 10);
    const maxResults = isNaN(parsedMax) ? 10 : Math.min(parsedMax, MAX_RESULTS_LIMIT);

    try {
        const coins: any = await prisma.coin.findMany({
            take: maxResults,
            skip: 0,
            orderBy: [
                {
                    created_at: "desc",
                },
            ],
            include: {
                image: true,
            },
        });
        if (coins.length === 0) {
            return NextResponse.json({ message: "No coins found." });
        }
        return NextResponse.json(coins);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
