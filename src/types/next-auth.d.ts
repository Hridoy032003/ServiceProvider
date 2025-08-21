import { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: string | null; 
      hasAccess: boolean;
    } & DefaultSession["user"]; 
  }
ds
  interface User {
      username?: string | null;
      role?: string | null;
      hasAccess?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: string | null;
    hasAccess: boolean;
  }
}