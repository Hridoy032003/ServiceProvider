import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import Link from 'next/link';

import React from 'react'


const page =async () => {
  
  return (
    <div className='flex flex-col justify-center items-center h-screen shadow-accent'>
      <Card className='p-20'>
        Register Your Comnpany
        <Link href="/serviceProvider/serviceProviderRegister"><Button variant={"outline"}>Register your comapany</Button></Link>
      </Card>
    </div>
  );
}

export default page