import db from "@/db";
import { user } from "@/db/schema";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { hc } from "hono/client";
import { ICreateUser } from "@/app/api/v1/[[...route]]/route";
import { eq } from "drizzle-orm";

const client = hc<ICreateUser>("http://localhost:3000");

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        id: {},
        name: {},
      },
      authorize: async ({ email, id, name }) => {
        const data = {
          email: email as string,
          id: id as string,
          name: name as string,
        };
        return data;
      },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.sub!;
      return session;
    },
    signIn: async ({ user: userProvider, account }) => {
      try {
        if (account?.provider === "github" || account?.provider === "google") {
          const { image, name, email } = userProvider;

          if (!email) {
            throw new AuthError("Failed to sign in");
          }

          const isUserExist = await db
            .select()
            .from(user)
            .where(eq(user.email, email));

          if (isUserExist.length === 0) {
            await client.api.v1.register.$post({
              json: {
                name: name as string,
                email,
                image: image as string,
                type: account.provider,
              },
            });
          }
          return true;
        } else if (account?.provider === "credentials") {
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
        throw new AuthError("Failed to sign in");
      }
    },
  },
});
