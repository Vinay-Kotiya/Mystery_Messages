"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
const Navbar = () => {
  const { data: session } = useSession();
  // const user: User = session?.user as User;
  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900  text-white md:m-2 md:rounded-2xl">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold mb-4 md:mb-0 cursor-pointer "
        >
          Mystery Messages
        </Link>
        {session ? (
          <div className="flex md:gap-10 gap-3 justify-end w-1/2 items-center">
            {/* <span className="mr-4">Welcome, {user.username || user.email}</span> */}

            {/* <Link href={"/dashboard"}>
              <Button
                // onClick={() => signOut()}
                className="md:w-auto  w-20  bg-slate-100 text-black"
                variant="outline"
              >
                Dashboard
              </Button>
            </Link> */}

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
