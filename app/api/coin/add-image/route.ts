import { convertToPrismaCoinCreateInput } from "@/lib/utils";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

export async function PATCH(req: Request) {
    const data = await req.json();
    try {
        return await prisma.image.create({ data });
    } catch (e) {
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
}
