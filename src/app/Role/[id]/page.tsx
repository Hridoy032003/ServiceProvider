import React from "react";
import { getAuthSession } from "@/lib/auth";
import { RoleSelectionGrid } from "@/components/globle-component/RoleSelectionGrid ";


export default async function ChooseRolePage(

 ) {

  const session = await getAuthSession();

  if (!session?.user) {
    return <p>You must be logged in to view this page.</p>;
  }

// if (session.user.role === "customer") {
//   router.push(`/customer/dashboard/${session.user.id}`);
// } else if (session.user.role === "service_provider") {
//   router.push(`/serviceProvider/dashboard/${session.user.id}`);
// }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
        Choose Your Role
      </h1>
      <p className="mb-8 text-center text-gray-500">
        How will you be using our platform, {session.user.name}?
      </p>

      <RoleSelectionGrid userId={session.user.id} />
    </div>
  );
}
