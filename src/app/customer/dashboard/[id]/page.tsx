import UserDashboard from '@/components/customer/UserDashboard';
import UserDashboardTabke from '@/components/customer/UserDashboardTabke';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/utils/db';

import React from 'react'

const page = async() => {
  const session = await getAuthSession();
   const bookings = await db.booking.findMany({
     where: {
       userId: session?.user?.id,
     },
   
     include: {
       service: {
         select: {
           name: true,
         },
       },
       user: {
         select: {
           name: true, 
         },
       },
     },
     orderBy: {
       date: "desc", 
     },
   });
  return (
    <div className="flex flex-col">
      {session?.user && <UserDashboard user={session.user} />}
      <UserDashboardTabke bookings={bookings} />
    </div>
  );
}

export default page