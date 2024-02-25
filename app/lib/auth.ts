import { PrismaAdapter } from "@auth/prisma-adapter"



import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from "./db"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Add other providers as needed
  ],
  // Other configuration options
};

export const handler = NextAuth(authOptions);