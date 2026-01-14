import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "../prismaclient";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7
    },
    user: {
        additionalFields: {
            username: {
                type: "string",
                required: true
            },
            bio: {
                type: "string",
                required: false
            },
            avatar: {
                type: "string",
                required: false
            }
        }
    },

    plugins: [nextCookies()]
});




export type Session = typeof auth.$Infer.Session
export type SessionUser = typeof auth.$Infer.Session.user