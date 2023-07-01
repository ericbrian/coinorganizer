import prisma from "@/prisma/client";

export async function POST(req: Request) {
    const data = await req.json();

    const coin = await prisma.coin.create({
        data: {
            obverse: data.obverse,
            reverse: data.reverse,
            face_value: data.face_value,

        }
    });

    return new Response("Hello, Next.js!");
}

// const userAndPosts = await prisma.user.create({
//     data: {
//       posts: {
//         create: [
//           { title: 'Prisma Day 2020' }, // Populates authorId with user's id
//           { title: 'How to write a Prisma schema' }, // Populates authorId with user's id
//         ],
//       },
//     },
//   })
