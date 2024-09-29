import { PrismaClient } from "@prisma/client";

declare global {
  // Change `var` to `let` for better scoping rules
  var prisma: PrismaClient | undefined;
}

// Use `const` here since the client itself will not be reassigned
const client = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = client;

export default client;
