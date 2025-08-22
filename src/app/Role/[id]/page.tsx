import React from "react";
import { getAuthSession } from "@/lib/auth";
import { RoleSelectionGrid } from "@/components/globle-component/RoleSelectionGrid ";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";


export default async function ChooseRolePage(

 ) {

  const session = await getAuthSession();
const token = await getToken(
  {
    req: NextRequest as unknown as NextRequest,
    secret: process.env.NEXTAUTH_SECRET
  }
);
console.log(" token", token);

  if (!session?.user) {
    return <p>You must be logged in to view this page.</p>;
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
        Choose Your Role
      </h1>
      <p className="mb-8 text-center text-gray-500">
        How will you be using our platform, {session.user.name}?
      </p>

      <RoleSelectionGrid userId={session.user.id} tokenRole={token?.role as string}/>
    </div>
  );
}
