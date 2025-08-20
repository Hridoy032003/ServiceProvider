import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Button } from '../ui/button';
import { getAuthSession } from '@/lib/auth';
const NavbarSP =async () => {
  const session = await getAuthSession();
  console.log(session);
  return (
    <div className=" flex  border-b border-gray-200 border-opacity-60  p-2 lg:px-30 md:px-10 px-5 justify-between items-center">
      <Link
        href="/serviceProvider"
        className="flex justify-center items-center gap-2"
      >
        <Image
          src="/image.png"
          alt="Vercel Logo"
          width={100}
          height={100}
          className="lg:h-15 lg:w-15 object-cover rounded-full md:h-10 md:w-10 h-10 w-10"
        />
        <h1 className="text-md font-smilibold  lg:text-lg md:text-lg ">
          SPARKLE & SHINE
        </h1>
      </Link>
      {(session?.user?.role === "service_provider" &&
        session?.user?.hasAccess === true && (
          <div className=" gap-4 hidden md:flex lg:flex">
            <Link
              href={`/serviceProvider`}
              className="hover:underline underline-offset-4"
            >
              Home
            </Link>
            <Link
              href={`/serviceProvider/dashboard/${session?.user?.id}`}
              className="hover:underline underline-offset-4"
            >
             Dashboard
            </Link>
           
          </div>
        )) ||
        (session?.user?.role === "service_provider" &&
          session?.user?.hasAccess === false && (
            <Link href={`/serviceProvider/suscription/${session?.user?.id}`}>
              <Button>Subscribe</Button>
            </Link>
          ))}
    </div>
  );
}

export default NavbarSP