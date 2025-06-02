import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { JWT } from "next-auth/jwt";

interface CustomUser extends User {
  _id: string;
  username: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  email: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<CustomUser | null> {
        await dbConnect();
        try {
          if (!credentials) {
            throw new Error("No credentials provided");
          }

          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your email before logging in");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordValid) {
            // Type assertion to ensure _id is a string or ObjectId
            const userId =
              typeof user._id === "string" ? user._id : user._id?.toString?.();
            if (!userId) throw new Error("User ID is missing or invalid");
            return {
              id: userId, // <-- Add this line
              _id: userId,
              username: user.username,
              isVerified: user.isVerified,
              isAcceptingMessages: user.isAcceptingMessages,
              email: user.email,
            };
          } else {
            throw new Error("Invalid password");
          }
        } catch (err) {
          throw new Error((err as Error).message || "Authorization failed");
        }
      },
    }),
  ],
  ////////updated callback////////
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user._id;
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user._id = token.id;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
      }
      return session;
    },
  },
  //////////old callback/////////
  // callbacks: {
  //   async jwt({
  //     token,
  //     user,
  //   }: {
  //     token: JWT;
  //     user?: CustomUser | User;
  //     // [key: string]: any;
  //   }) {
  //     if (user) {
  //       // token.id = user._id;
  //       // token.username = user.username;
  //       // token.isVerified = user.isVerified;
  //       // token.isAcceptingMessages = user.isAcceptingMessages;
  //       token.id = (user as CustomUser)._id;
  //       token.username = (user as CustomUser).username;
  //       token.isVerified = (user as CustomUser).isVerified;
  //       token.isAcceptingMessages = (user as CustomUser).isAcceptingMessages;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token && session.user) {
  //       session.user._id = token.id;
  //       session.user.username = token.username;
  //       session.user.isVerified = token.isVerified;
  //       session.user.isAcceptingMessages = token.isAcceptingMessages;
  //     }
  //     return session;
  //   },
  // },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

//////old code //////
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any): Promise<any> {
//         await dbConnect();
//         try {
//           if (!credentials) {
//             throw new Error("No credentials provided");
//           }
//           const user = await UserModel.findOne({
//             $or: [
//               { email: credentials.identifier },
//               { username: credentials.identifier },
//             ],
//           });
//           if (!user) {
//             throw new Error("No user found with this email");
//           }
//           if (!user.isVerified) {
//             throw new Error("Please verify your email before Logging in");
//           }
//           const isPasswordValid = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );
//           if (isPasswordValid) {
//             return user;
//           } else {
//             throw new Error("Invalid password");
//           }
//         } catch (err: any) {
//           throw new Error(err);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user._id?.toString();
//         token.username = user.username;
//         token.isVerified = user.isVerified;
//         token.isAcceptingMessages = user.isAcceptingMessages;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user._id = token.id;
//         session.user.username = token.username;
//         session.user.isVerified = token.isVerified;
//         session.user.isAcceptingMessages = token.isAcceptingMessages;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/sign-in",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };
