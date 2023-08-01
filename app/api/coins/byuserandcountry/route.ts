import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { coin as dbCoin, image as dbImage } from "@prisma/client";

type LatestCoins = (dbCoin & { image: dbImage[] })[];

export async function GET(req: NextRequest) {

    const userEmail = '"asdf@asdf.zzz"';

    try {
        const items: any = await prisma.collection.findMany({
            orderBy: [
                {
                    coin_id: "desc",
                },
            ],
            include: {
                coin: {
                    include: {
                        country: true
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
        });

        if (items.length === 0) {
            return NextResponse.json({ message: "No items found." });
        }

        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
