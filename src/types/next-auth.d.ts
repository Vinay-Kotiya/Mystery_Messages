import "next-auth";
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface User {
    id?: string; //new change 2-6
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
  // interface User {
  //   _id?: string;
  //   username?: string;
  //   email?: string;
  //   password?: string;
  //   isVerified?: boolean;
  //   isAcceptingMessages?: boolean;
  // }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}
//////new code//////
// import "next-auth";
// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       _id: string;
//       username: string;
//       isVerified: boolean;
//       isAcceptingMessages: boolean;
//     } & DefaultSession["user"];
//   }

//   interface User {
//     _id: string;
//     username: string;
//     email: string;
//     password: string;
//     isVerified: boolean;
//     isAcceptingMessages: boolean;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     username: string;
//     isVerified: boolean;
//     isAcceptingMessages: boolean;
//   }
// }
