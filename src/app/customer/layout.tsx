import Navbar from '@/components/Navbar';
import React from 'react'
import { getAuthSession } from '@/lib/auth';

import AccessDenied from '@/components/AccessDenied';
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
       
         <AccessDenied/>
  
      )}
    </div>
  );
};

export default layout