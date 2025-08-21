import { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: string | null; 
      hasAccess: boolean;
    } & DefaultSession["user"]; 
  }

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