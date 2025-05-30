"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { User } from "next-auth";
import { Button } from "./ui/button";
const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  return (
    // <div className="max-w-full justify-around items-center flex py-5 m-3 bg-gray-200   rounded">
    //   <span className="text-2xl font-black">Mystery Messages</span>
    //   {session ? (
    //     <>
    //       <span className="text-xl font-bold">
    //         Welcome, {user?.username || user?.email}
    //       </span>
    //       <Button
    //         onClick={() => {
    //           signOut();
    //         }}
    //       >
    //         Logout
    //       </Button>
    //     </>
    //   ) : (
    //     <Link href={"/sign-in"}>
    //       <Button>Login</Button>
    //     </Link>
    //   )}
    // </div>
    <nav className="p-4 md:p-6 shadow-md bg-gray-900  text-white md:m-5 md:rounded-2xl">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <a href="/" className="text-xl font-bold mb-4 md:mb-0 ">
          Mystery Messages
        </a>
        {session ? (
          <div className="flex md:gap-10 gap-3 md:justify-end w-1/2 items-center">
            {/* <span className="mr-4">Welcome, {user.username || user.email}</span> */}

            <Link href={"/dashboard"}>
              <Button
                // onClick={() => signOut()}
                className="md:w-auto  w-20  bg-slate-100 text-black"
                variant="outline"
              >
                Dashboard
              </Button>
            </Link>

            <Button
              onClick={() => signOut()}
              className="md:w-auto w-20  bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
