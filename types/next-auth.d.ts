// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session/user types to include user role
   */

  interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    phone_number: string;
    username: string;
    role: number; // Ensure the type matches your database schema and user object
    image: string | null;
  }

  interface Session {
    user: {
      role?: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the JWT type to include user role
   */
  interface JWT {
    role?: number;
  }
}
