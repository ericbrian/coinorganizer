import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const coins: any = await prisma.coin.findMany({
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
    return NextResponse.json({ error });
  }
}
function rewriteForAlgolia(coins: any) {
  const managed = coins.map((coin: any) => {
    const managedCoin = {
      objectID: coin.id,
      common_name: coin.common_name,
      pretty_face_value: coin.pretty_face_value,
      obverse: coin.obverse,
      reverse: coin.reverse,
      composition: coin.composition,
      series_or_theme_name: coin.series_or_theme_name,
      year_start: coin.year_start,
      year_end: coin.year_end ?? coin.year_start,
      images: coin.image,
      country: coin.country?.name,
      cc: coin.country?.iso_3166_alpha_2,
      currency: coin.currency?.name,
      shape: coin.shape?.name,
    };
    return managedCoin;
  });
  return managed;
}

