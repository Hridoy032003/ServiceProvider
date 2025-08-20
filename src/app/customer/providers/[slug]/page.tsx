import Service from '@/components/customer/Service';
import { db } from '@/utils/db';

import React from 'react'

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
   const { slug } = await params;
  const services= await db.service.findMany(
    {
      where: {
        serviceProviderId: slug
      }
    }
  );
const formattedServices = services.map((service) => ({
  ...service,
  price: service.price.toNumber(),
}));
  return (
    <div>
      <Service services={formattedServices} />
    </div>
  );
};

export default page