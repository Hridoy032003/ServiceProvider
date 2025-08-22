"use client";

import React from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { rolesData } from "@/helper/role";
import { setUserRole } from "@/app/actions/set-user-role";



function PendingOverlay() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/70">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
    </div>
  );
}

export function RoleSelectionGrid({ userId }: { userId: string }) {
  const { update } = useSession();
const [loding, setSetloading] = React.useState<Boolean>(false);

  const handleSetRole = async (formData: FormData) => {
    await setUserRole(formData);
 
const newRole = formData.get("role") as string;

    if (newRole) {
      await update({ role: newRole });
     setSetloading(false);
    }
  };
if(loding){
  return <div className="h-screen flex items-center justify-center w-screen bg-gray-100">Loading...</div>;
}
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {rolesData.map((role) => (
        <form action={handleSetRole} key={role.id}>
          <input type="hidden" name="userId" value={userId} />
          <input type="hidden" name="role" value={role.id} />

          <Card className="group relative h-80 w-80 cursor-pointer overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
            <Image
              src={role.imageSrc}
              alt={role.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-6 text-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <h2 className="text-3xl font-bold">{role.name}</h2>
              <p className="mt-4 text-lg">Continue as {role.name}</p>
            </div>

            {/* This still works because the 'pending' status tracks the
                server action called within our `handleSetRole` function. */}
            <PendingOverlay />

            <button
              type="submit"
              aria-label={`Select role: ${role.name}`}
              className="absolute inset-0 h-full w-full bg-transparent"
            ></button>
          </Card>
        </form>
      ))}
    </div>
  );
}
