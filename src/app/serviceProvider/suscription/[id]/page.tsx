import { Card } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
  
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-10 bg-gray-50 p-4">
      <a
        href={process.env.MONTHLY_SUBSCRIPTION_LINK!}
       
        className="transition-transform duration-300 hover:scale-105"
      >

        <Card className="w-80 p-8 rounded-xl shadow-lg text-center">
          <div>
        
            <h1 className="text-3xl font-bold mb-3 text-gray-800">Monthly</h1>
          
            <p className="text-gray-500 mb-6 h-24">
              Subscription of Monthly just in $49 and enjoy our services. You
              can cancel your subscription at any time.
            </p>
          </div>
          
          <p className="text-5xl font-extrabold text-black">$49</p>
        </Card>
      </a>

      <a
        href={process.env.YEARLY_SUBSCRIPTION_LINK!}
        className="transition-transform duration-300 hover:scale-105"
      >
        <Card className="w-80 p-8 rounded-xl shadow-lg text-center">
          <div>
            <h1 className="text-3xl font-bold mb-3 text-gray-800">Yearly</h1>
            <p className="text-gray-500 mb-6 h-24">
              Subscription of Yearly just in $499 and save money. You can cancel
              your subscription at any time.
            </p>
          </div>
          <p className="text-5xl font-extrabold text-black">$499</p>
        </Card>
      </a>
    </div>
  );
};

export default page;
