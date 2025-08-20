import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div>
      <Navbar />
      <div className='md:px-30 lg:px-30 px-5'>{children}</div>
    </div>
  );
}

export default layout