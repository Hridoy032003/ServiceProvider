"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Tag, Info } from "lucide-react";
import Link from "next/link";


type Service = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  durationInMinutes: number;
  serviceProviderId: string; 
};


type ServiceListProps = {
  services: Service[];
};


const   ServiceList = ({ services }: ServiceListProps) => {

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">No Services Available</h2>
        <p className="text-muted-foreground mt-2">
          This provider has not listed any services yet. Please check back
          later.
        </p>
      </div>
    );
  }

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Link
            href={`/customer/providers/${service.serviceProviderId}/bookingSlot/${service.id}`}
            key={service.id}
          >
            <Card
              key={service.id}
              className="flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription className="flex items-center pt-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{service.durationInMinutes} minutes</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <div className="flex items-center text-lg font-bold text-primary">
                  <Tag className="h-5 w-5 mr-2" />

                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(service.price)}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button variant="outline">
                  <Info className="h-4 w-4 mr-2" />
                  More Info
                </Button>
                <Button>Book Now</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServiceList;
