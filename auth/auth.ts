import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async ({ email, password }) => {
        const user = { id: "1", name: "John Doe", email: "" };

        if (!password) throw new CredentialsSignin("Password is required");
        return user;
      },
    }),
  ],
});
