import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const images = await prisma.image.findMany({
            select: {
                url: true,
            },
            where: {
                url: {
                    not: null,
                },
            },
        });
        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
