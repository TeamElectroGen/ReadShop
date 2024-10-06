import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const handler = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        emailOrPhone: {},
        password: {},
      },
      async authorize(credentials) {
        const { emailOrPhone, password } = credentials;
        if (!emailOrPhone || !password) {
          return null;
        }
        const db = await connectDB();
        const currentUser = await db
          .collection("users")
          .findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
        if (!currentUser) {
          return null;
        }
        const passwordMatched = bcrypt.compareSync(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          return null;
        }
        console.log(currentUser);
        return currentUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email, image } = user;
        try {
          const db = await connectDB();
          const userCollection = db.collection("users");
          const exist = await userCollection.findOne({ email });
          if (!exist) {
            await userCollection.insertOne({
              name,
              email,
              image,
              role: "user",
              isActive: true,
              createdAt: new Date(),
              isEmailVerified: true,
              lastLogin: new Date(),
            });
            return user;
          } else {
            return user;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return user;
      }
    },
  },
});

export { handler as GET, handler as POST };
