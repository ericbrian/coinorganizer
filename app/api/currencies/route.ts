import prisma from "@/prisma/client";
import { currency as currencyDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const currencies: currencyDb[] = await prisma.currency.findMany({
      include: {
        country_currency: true,
      },
    });
    return NextResponse.json(currencies);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
