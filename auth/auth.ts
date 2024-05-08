import db from "@/db";
import { user } from "@/db/schema";
import { nanoid } from "nanoid";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
    session: async ({ session, token, user }) => {
      session.user.id = token.sub!;
      return session;
    },
    signIn: async ({ user: userProvider, account }) => {
      try {
        if (account?.provider === "github" || account?.provider === "google") {
          const { image, name, email } = userProvider;
          const id = nanoid();

          if (!image || !name || !email) {
            throw new AuthError("Failed to sign in");
          }

          const isUserExist = (await db.select().from(user)).find(
            (user) => user.email === email
          );

          if (!isUserExist) {
            await db
              .insert(user)
              .values({
                id,
                name,
                email,
                image,
                password: "hello",
                isVerified: true,
              })
              .returning();
          }
          return true;
        }
        return false;
      } catch (error) {
        throw new AuthError("Failed to sign in");
      }
    },
  },
});
