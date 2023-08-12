import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req: Request) {
  const data = await req.json();
  // const coin_id = data.coin_id;

  try {
    return await prisma.coin_mint.create({ data });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          `There is a unique constraint violation, a Coin-Mint relation cannot be created with this data: ${JSON.stringify(data)}`
        )
      }
    }
    throw e
  }
}
