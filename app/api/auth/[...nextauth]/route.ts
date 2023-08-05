import NextAuth from "next-auth";
import authOptions from "./options";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Auth
// https://www.youtube.com/watch?v=w2h54xz6Ndw&ab_channel=DaveGray
// https://github.com/gitdagray/next-auth-intro

// Role Based Auth
// https://www.youtube.com/watch?v=ay-atEUGIc4&ab_channel=DaveGray
// https://github.com/gitdagray/next-auth-role-based
