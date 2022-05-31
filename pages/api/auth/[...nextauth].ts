import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { Awaitable, User } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY as string,
      clientSecret: process.env.TWITTER_API_KEY_SECRET as string,
      // version: "2.0",
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.subscribed = user.subscribed;
      return session;
    },
  },
});
