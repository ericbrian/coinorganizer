import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { ruler as RulerType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const rulers: RulerType[] = await prisma.ruler.findMany({
      include: {
        ruler_country: true,
      },
      orderBy: [
        { house: 'asc' },
        { name: 'asc' }
      ],
    });
    return NextResponse.json(rulers);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
