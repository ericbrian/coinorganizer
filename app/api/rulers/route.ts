import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { ruler as rulerDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const rulers: rulerDb[] = await prisma.ruler.findMany({
      include: {
        ruler_country: true,
      },
    });
    return NextResponse.json(rulers);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
