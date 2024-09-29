import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role?: string;
    };
  }
}

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role?: string;
    };
  }
}
