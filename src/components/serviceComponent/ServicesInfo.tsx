import React from "react";
import Link from "next/link";
import { db } from "@/utils/db"; // Your Prisma client
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui

interface ServicesInfoProps {
  serviceProvider: {
    id: string;
  };
}

const ServicesInfo = async ({ serviceProvider }: ServicesInfoProps) => {
  console.log(serviceProvider);
  if (!serviceProvider?.id) {
    return (
      <div className="p-8 text-center text-red-500">
        Error: Service Provider ID is missing.
      </div>
    );
  }

  const allServices = await db.service.findMany({
    where: {
      serviceProviderId: serviceProvider.id,
    },

    orderBy: {
      createdAt: "desc", 
    },
  });

  return (
    <div className="my-4 sm:p-6 md:p-8 rounded-lg bg-white shadow-lg mt-6 min-w-150 ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 sm:mb-0">
          My Services
        </h2>
        <Link href={`/serviceProvider/serviceProviderRegister/services`}>
          <Button>+ Add New Service</Button>
        </Link>
      </div>

      <div>
        {allServices && allServices.length > 0 ? (
          <div className="space-y-4 max-h-100 overflow-scroll scrollbar-thin">
            {allServices.map((service) => (
              <div
                key={service.id}
                className="flex flex-col sm:flex-row justify-between items-start border rounded-lg p-4 bg-gray-50 transition-all hover:bg-white hover:shadow-md"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{service.description}</p>
                </div>
                <p className="text-lg font-bold text-blue-600 mt-2 sm:mt-0 whitespace-nowrap">
                  ${parseFloat(service.price.toString()).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          // This message is shown if the `allServices` array is empty
          <div className="text-center py-12 px-6 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-medium text-gray-700">
              No Services Found
            </h3>
            <p className="text-gray-500 mt-2">
              Click the Add New Service button to list what you offer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesInfo;
