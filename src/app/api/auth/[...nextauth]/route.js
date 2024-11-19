import { connectDB } from "@/lib/connectDB";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
        try {
          const { emailOrPhone, password } = credentials;
          if (!emailOrPhone || !password) {
            return null;
          }
          const db = await connectDB();

          const user = await db.collection("users").findOne({
            $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in");
          }

          const isPasswordValid = await compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
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
              emailVerified: true,
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
