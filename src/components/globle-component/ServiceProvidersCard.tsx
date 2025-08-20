import React from 'react'
import { Card } from '../ui/card'

import Link from 'next/link';
import Image from 'next/image';
type serviceType= {
    id: string;
    contactEmail: string;
    businessName: string;
    phoneNumber: string;
    userId: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}[]
const ServiceProvidersCard = ({
  serviceProviders,
}: {
  serviceProviders: serviceType;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
      {serviceProviders.map((service ) => (
        <Link href={`/customer/providers/${service.id}`} key={service.id}>
          {" "}
          <Card className="group relative overflow-hidden rounded-lg cursor-pointer h-80 p-10">
            <Image
              src="/demoProvider.jpg"
              alt={service.contactEmail}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out group-hover:scale-110"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="text-2xl font-bold">{service.businessName}</h3>
              <p className="mt-2">{service.contactEmail}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ServiceProvidersCard