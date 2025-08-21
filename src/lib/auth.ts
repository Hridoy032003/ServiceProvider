import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from 'nanoid';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { db } from '@/utils/db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // ... your providers are unchanged
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Email OTP',
      credentials: {
        email: { label: 'Email', type: 'email' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          throw new Error('Please provide both email and OTP.');
        }
        const { email, otp } = credentials;
        const dbToken = await db.verificationToken.findUnique({ where: { identifier: email } });
        if (!dbToken) {
          throw new Error('Invalid OTP. Please request a new one.');
        }
        if (new Date(dbToken.expires) < new Date()) {
          await db.verificationToken.delete({ where: { identifier: email } });
          throw new Error('OTP has expired. Please request a new one.');
        }
        const isOtpValid = await compare(otp, dbToken.token);
        await db.verificationToken.delete({ where: { identifier: email } });
        if (!isOtpValid) {
          throw new Error('Invalid OTP provided.');
        }
        let user = await db.user.findUnique({ where: { email } });
        if (!user) {
          user = await db.user.create({
            data: {
              email: email,
              name: email.split('@')[0],
            },
          });
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
  
        if (trigger === "update" && session?.role) {
      console.log("TRIGGERED VIA UPDATE! New role from session:", session.role);
      token.role = session.role;
      return token;
    }

      const dbUser = await db.user.findFirst({
        where: {
          email: token.email!,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }


      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username || nanoid(10),
        role: dbUser.role,
        hasAccess: dbUser.hasAccess,
      };
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
        session.user.role = token.role as string;
        session.user.hasAccess = token.hasAccess as boolean;
      }
      return session;
    },

    redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);