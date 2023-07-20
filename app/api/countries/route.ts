import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { country as countryDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const countries: countryDb[] = await prisma.country.findMany({
            orderBy: {
                short_name: "asc",
            },
        });
        return NextResponse.json(countries);
    } catch (error) {
        return NextResponse.json({ error });
    }
}
