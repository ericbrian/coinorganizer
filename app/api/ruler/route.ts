import { convertToPrismaMintCreateInput, convertToPrismaRulerCreateInput } from '@/utils';
import { Prisma, PrismaClient, mint as MintType } from '@prisma/client'
const prisma = new PrismaClient()

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const data = convertToPrismaRulerCreateInput(payload);

  let ruler;

  try {
    ruler = await prisma.ruler.create({ data });
  }
  catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    throw e
  }

  try {
    if (ruler && 'country' in payload) {
      await prisma.country_mint.create({ data: { country_id: payload.country.id, mint_id: ruler.id } })
    };
  }
  catch (e) {
    console.error(e);
  }

  return ruler;
}
