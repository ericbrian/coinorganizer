import type { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import appconfig from "@/appconfig";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const payload = {
                    email: credentials?.email,
                    password: credentials?.password,
                };

                const res = await fetch(`${appconfig.envs.dev.clientBaseUrl}/api/tokens`, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const user = await res.json();
                if (!res.ok) {
                    throw new Error(user.message);
                }
                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user;
                }

                // Return null if user data could not be retrieved
                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    secret: process.env.JWT_SECRET,

    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === 'development',
}

export default authOptions;
