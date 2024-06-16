import { verifyPassword } from "@lib/auth";
import prisma from "@lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // !!! Should be stored in .env file.
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (
          user &&
          (await verifyPassword(
            credentials?.password as string,
            user.passwordHash as string
          ))
        ) {
          return { id: user.id, email: user.email };
        }

        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
