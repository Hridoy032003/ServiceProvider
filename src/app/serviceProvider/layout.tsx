import React from "react";
import { getAuthSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavbarSP from "@/components/serviceComponent/NavbarSP";
import AccessDenied from "@/components/AccessDenied";


const serviceLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  return (
    <div>
      {session?.user?.role === "service_provider" ? (
        <>
        <NavbarSP/>
          <div className="md:px-30 lg:px-40 px-5">{children}</div>
        </>
      ) : (
       <AccessDenied/>
      )}
    </div>
  );
};

export default serviceLayout;
