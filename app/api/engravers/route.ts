import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { engraver as engraverDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const engravers: engraverDb[] = await prisma.engraver.findMany();
        return NextResponse.json(engravers);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
