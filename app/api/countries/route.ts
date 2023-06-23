import prisma from "@/prisma/client";
import { country as countryDb } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const countries: countryDb[] = await prisma.country.findMany();
    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
