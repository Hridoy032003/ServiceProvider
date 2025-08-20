// app/your-route/[id]/page.tsx

import React from "react";
import { db } from "@/utils/db";
import Booking from "@/components/customer/Booking";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

interface FormattedService {
  id: string;
  name: string;
  price: number;
  duration: number;
}

const Page = async ({
  params,
}: {
  params: Promise<{  id: string }>;
}) => {
  const { id } = await params;

  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const service = await db.service.findUnique({
    where: { id: id },
  });

  if (!service) {
    return <div>Service not found.</div>;
  }

  const formattedService: FormattedService[] = [
    {
      id: service.id,
      name: service.name,
      price: service.price.toNumber(),
      duration: service.durationInMinutes,
    },
  ];

  return (
    <div className="p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Booking Slot</h1>
      <Booking
        services={formattedService}
        userId={session.user.id}
        providerId={service.serviceProviderId}
      />
    </div>
  );
};

export default Page;
