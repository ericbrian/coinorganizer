import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(req: Request, { params }: any) {
  try {
    const data = await prisma.coin.findFirst({
      where: {
        id: { equals: +params.id },
      },
      include: {
        image: true,
        country: true,
        ruler: true,
        period: true,
        coin_engraver: {
          include: {
            engraver: true,
          }
        },
        coin_mint: {
          include: {
            mint: true,
          }
        },
      },
    });

    return NextResponse.json(data);
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      } else {
        console.log('e.code', e.code)
      }
    }
    throw e
  }
}

