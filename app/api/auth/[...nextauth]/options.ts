import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import client from "@/app/libs/prismadb"; // Correct import for prisma client

export const options: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is in your .env file
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await client.userAccount.findFirst({
          where: {
            OR: [
              { email: credentials?.email },
              { username: credentials?.email },
            ],
          },
        });

        if (user && credentials?.password) {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (isValidPassword) {
            return user;
          }
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
  adapter: PrismaAdapter(client),
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  pages: {
    signIn: "",
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub, // Attach user ID from token
          image: token.picture || "", // Attach user image from token
          role: token.role || "",
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach the user ID to the JWT token
        token.role = user.role;
        token.picture = user.image;
      }
      return token;
    },
  },
};
