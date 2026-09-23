import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";
import {
  findUserByEmail,
  findUserByGoogleId,
  createUserFromGoogle,
  linkGoogleAccount,
} from "@/lib/db";

export const isGoogleLoginConfigured = Boolean(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString();
        if (!email || !password) return null;

        const user = await findUserByEmail(email);
        if (!user || !user.password_hash) return null;

        const valid = bcrypt.compareSync(password, user.password_hash);
        if (!valid) return null;

        return {
          id: String(user.id),
          name: [user.name, user.last_name].filter(Boolean).join(" "),
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
    ...(isGoogleLoginConfigured
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;

      const googleId = account.providerAccountId;
      let dbUser = await findUserByGoogleId(googleId);

      if (!dbUser && user.email) {
        dbUser = await findUserByEmail(user.email);
        if (dbUser) {
          await linkGoogleAccount(dbUser.id, { googleId, image: user.image });
        }
      }

      if (!dbUser) {
        dbUser = await createUserFromGoogle({
          name: user.name ?? user.email,
          email: user.email,
          googleId,
          image: user.image,
        });
      }

      user.id = String(dbUser.id);
      user.role = dbUser.role;
      return true;
    },
  },
});
