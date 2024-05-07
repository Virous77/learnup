import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: async ({ session, token, user }) => {
      session.user.id = token.sub!;
      return session;
    },
  },
});
