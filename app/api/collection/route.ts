import { convertToPrismaCollectionCreateInput } from "@/lib/utils";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {

    // TODO get session from request and the email address to get the user id
    // import { getServerSession } from "next-auth/next"
    // import { authOptions } from "../auth/[...nextauth]/route";
    // const session = await getServerSession(req, res, authOptions)
    // if (session) {
    //     // Signed in
    //     console.log("Session", JSON.stringify(session, null, 2))
    // }

    const userId = 1; // TODO get from session

    try {
        const coins: any = await prisma.collection.findMany({
            where: {
                owner_id: userId,
            },
            include: {
                coin: {
                    include: {
                        image: true,
                        currency: true,
                        country: true,
                        shape: true,
                        period: true,
                        // FIXME figure out why coin_engravers is not working
                        // coin_engravers: {
                        //     include: {
                        //         engraver: true
                        //     }
                        // },
                    },
                },
                mint: true,
                currency: true,
            },
            orderBy: [
                {
                    coin: {
                        country: {
                            short_name: 'asc'
                        }
                    }
                },
                {
                    currency: {
                        short_name: 'asc'
                    }
                },
                {
                    year: 'asc'
                },
                {
                    coin: {
                        face_value: 'asc'
                    }
                }
            ]
        });
        if (coins.length === 0) {
            return NextResponse.json({ message: "No collection items found." });
        }
        return NextResponse.json(coins);
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export async function POST(req: Request) {
    const payload = await req.json();
    try {
        const data = convertToPrismaCollectionCreateInput(payload);
        return await prisma.collection.create({ data });
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
