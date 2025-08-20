import Link from "next/link";
import React from "react";
import Image from "next/image";

import Usermenu from "./globle-component/Usermenu";

import { getAuthSession } from "@/lib/auth";
import { Button } from "./ui/button";
import { typeSession } from "@/types/auth-type";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="flex border-b border-gray-200 border-opacity-60 p-2 lg:px-30 md:px-10 px-5 justify-between items-center">
      <Link href="/" className="flex justify-center items-center gap-2">
        <Image
          src="/image.png"
          alt="Vercel Logo"
          width={100}
          height={100}
          className="lg:h-15 lg:w-15 object-cover rounded-full md:h-10 md:w-10 h-10 w-10"
        />
        <h1 className="text-md font-smilibold lg:text-lg md:text-lg">
          SPARKLE & SHINE
        </h1>
      </Link>
      <div className="gap-4 hidden md:flex lg:flex">
        <Link href={"/"} className="hover:underline underline-offset-4">
          Home
        </Link>
        <Link
          href={"/customer/providers"}
          className="hover:underline underline-offset-4"
        >
          Providers
        </Link>
        <Link href={"/"} className="hover:underline underline-offset-4">
          ContectUs
        </Link>
      </div>
      {session?.user ? (
        <Usermenu session={session as typeSession} />
      ) : (
        <Link href={`/sign-in`}>
          <Button variant="outline">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
