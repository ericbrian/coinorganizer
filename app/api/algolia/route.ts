import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { rewriteForAlgolia } from "@/utils";
import { AlgoliaCoinType } from "@/global";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const coins: AlgoliaCoinType[] = await prisma.coin.findMany({
      select: {
        id: true,
        common_name: true,
        pretty_face_value: true,
        obverse: true,
        reverse: true,
        composition: true,
        series_or_theme_name: true,
        year_start: true,
        year_end: true,
        image: {
          select: {
            url: true,
            is_preferred: true,
          },
        },
        country: {
          select: {
            name: true,
            iso_3166_alpha_2: true,
          }
        },
        currency: {
          select: {
            name: true,
          }
        },
        shape: {
          select: {
            name: true,
          }
        }
      },
    });
    if (coins.length === 0) {
      return NextResponse.json({ message: "No coins found." });
    }

    const managed = rewriteForAlgolia(coins);
    return NextResponse.json(managed);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
