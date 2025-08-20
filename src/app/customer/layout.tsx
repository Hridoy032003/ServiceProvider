import Navbar from '@/components/Navbar';
import React from 'react'
import { getAuthSession } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
const layout =async ({ children }: { children: React.ReactNode }) => {
  const session=await getAuthSession();
  return (
    <div>
      {session?.user?.role === "customer" ? (
        <>
          <Navbar />
          <div className="md:px-30 lg:px-40 px-5">{children}</div>
        </>
      ) : (
        <div className="md:px-30 lg:px-40 px-5">
          <h1>Access Denied</h1>
          <Link href={"/"}><Button>Home</Button></Link>
        </div>
      )}
    </div>
  );
};

export default layout