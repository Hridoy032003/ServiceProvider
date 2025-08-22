
"use client";


import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { registerService } from "@/app/actions/serviceProvideAction/register-service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; 


const ServiceRegistrationPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

 
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");


  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); 

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
 
        await registerService(formData);

        toast.success("Service added successfully!");
      
        setServiceName("");
        setServiceDescription("");
        setServicePrice("");
        setServiceDuration("");
  
        router.refresh();
      } catch (err) {
    
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage); 
        toast.error(`Registration failed: ${errorMessage}`);
        console.error("Submission error:", err);
      }
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold">Register a New Service</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Fill out the details below to add a new service to your profile.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="serviceName">Service Name</Label>
          <Input
            id="serviceName"
            name="serviceName" 
            placeholder="e.g., Deep Tissue Massage"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="serviceDescription">Service Description</Label>
          <Textarea
            id="serviceDescription"
            name="serviceDescription"
            placeholder="Describe the service in detail..."
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="servicePrice">Service Price ($)</Label>
            <Input
              id="servicePrice"
              name="servicePrice"
              type="number"
              step="0.01"
              placeholder="e.g., 75.00"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="serviceDuration">Duration (minutes)</Label>
            <Input
              id="serviceDuration"
              name="serviceDuration"
              type="number"
              placeholder="e.g., 60"
              value={serviceDuration}
              onChange={(e) => setServiceDuration(e.target.value)}
            />
          </div>
        </div>

        

       
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Registering..." : "Register Service"}
        </Button>
      </form>
    </div>
  );
};

export default ServiceRegistrationPage;
