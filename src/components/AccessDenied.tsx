import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'


const AccessDenied = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-2">
      <h1>Access Denied</h1>
     <video>
     <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
     </video>
      <Link href={"/"}>
        <Button>Home</Button>
      </Link>
    </div>
  );
}

export default AccessDenied