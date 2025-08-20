// /app/dashboard/page.tsx

import React from "react";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/utils/db";
import { redirect } from "next/navigation";
import BookingDashboard from "@/components/serviceComponent/BookingDashboard";
import ServiceProviderInfromation from "@/components/serviceComponent/ServiceProviderInfromation";
import ServicesInfo from "@/components/serviceComponent/ServicesInfo";
import { BookingStatus } from "@prisma/client";

async function getProviderBookings() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const serviceProviderInfo = await db.serviceProvider.findUnique({
    where: { userId: session.user.id },
  });

  if (!serviceProviderInfo) {
    return [];
  }

  const bookings = await db.booking.findMany({
    where: {
      serviceProviderId: serviceProviderInfo.id,
    },
    include: {
      user: {
        select: { email: true },
      },
      service: true, // Fetch the full service object
      serviceProvider: true, // Fetch the full provider object
    },
    orderBy: {
      date: "desc",
    },
  });

  // THE FIX: Filter out bookings that don't have a status before mapping.
  const validBookings = bookings.filter(
    (booking): booking is typeof booking & { status: BookingStatus } =>
      booking.status !== null
  );

  // Now, map over the *filtered* array.
  const serializableBookings = validBookings.map((booking) => ({
    ...booking,
    service: {
      ...booking.service,
      price: booking.service.price.toNumber(), // Keep your Decimal to number conversion
    },
  }));

  return serializableBookings;
}

const DashboardPage = async () => {
  const bookings = await getProviderBookings();

  if (!bookings || bookings.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="p-8 text-center text-gray-500">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-10 justify-between ">
        <ServiceProviderInfromation
          sevicerviceProvider={bookings[0].serviceProvider}
        />
        <ServicesInfo serviceProvider={bookings[0].serviceProvider} />
      </div>
     
      <BookingDashboard bookings={bookings} />
    </div>
  );
};

export default DashboardPage;
