import { PrismaClient } from '@prisma/client'
import { currency as CurrencyType } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: any) {
  try {
    const items: CurrencyType[] = await prisma.currency.findMany({
      where: {
        id: parseInt(params.id)
      }
    });
    if (items.length === 0) return null;
    return NextResponse.json(items[0]);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
