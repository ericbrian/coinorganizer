import { NextRequest, NextResponse } from 'next/server';
import prisma from "../../../../prisma/client";
import { coin as dbCoin, image as dbImage } from '@prisma/client';

type LatestCoins = (dbCoin & { image: dbImage[]; })[]

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const max = searchParams.get('max')

    let maxResults = max ? +max : 10;
    if (maxResults > 10) maxResults = 10;

    try {
        const coins: any = await prisma.coin.findMany({
            take: maxResults,
            skip: 0,
            orderBy: [
                {
                    created_at: 'desc'
                }
            ],
            include: {
                image: true
            }
        });
        return NextResponse.json(coins)
    }
    catch (error) {
        return NextResponse.json({ error })
    }
}
