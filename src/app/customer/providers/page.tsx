import ServiceProvidersCard from '@/components/globle-component/ServiceProvidersCard';
import { db } from '@/utils/db';

import React from 'react'

const page =async () => {
  const serviceProviders = await db.serviceProvider.findMany();

  return (
    <div>
      <h1 className='text-2xl font-semibold py-5'>Our providers</h1>
      <div className=' items-center '>
        
        < ServiceProvidersCard serviceProviders={serviceProviders}/>
      </div>
    </div>
  );
}

export default page