import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { shape as shapeDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const shapes: shapeDb[] = await prisma.shape.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        return NextResponse.json(shapes);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
