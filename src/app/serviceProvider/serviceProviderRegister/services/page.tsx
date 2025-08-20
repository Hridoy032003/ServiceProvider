// app/your-route/page.tsx
"use client";


import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { registerService } from "@/app/actions/serviceProvideAction/register-service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
interface ServiceSchema {
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  serviceDuration: number;
  serviceImage: string;
}
const serviceSchema = z.object({
  serviceName: z.string().min(1, "Service name cannot be empty."),
  serviceDescription: z.string().min(1, "Service description cannot be empty."),

  // FIX: Change z.number() to z.coerce.number()
  servicePrice: z.coerce
    .number({ invalid_type_error: "Price must be a number." }) // Use this object for custom error messages
    .positive("Service price must be a positive number."),

  // FIX: Change z.number() to z.coerce.number()
  serviceDuration: z.coerce
    .number({ invalid_type_error: "Duration must be a number." })
    .int("Duration must be an integer.")
    .positive("Duration must be a positive number of minutes."),

  serviceImage: z.string().url("Please enter a valid URL for the image."),
});

// This part is already correct!
export type TServiceSchema = z.infer<typeof serviceSchema>;

const ServiceRegistrationPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

 const form = useForm<TServiceSchema>({
   resolver: zodResolver(serviceSchema),
   
   defaultValues: {
     serviceName: "",
     serviceDescription: "",
     servicePrice: 0,
     serviceDuration: 0,
     serviceImage: "",
   },
 });

  const onSubmit = (values: TServiceSchema) => {
    const formData = new FormData();
    
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    startTransition(async () => {
      try {
        await registerService(formData);
        toast.success("Service registered successfully!");
        form.reset();
        router.push("/service-provider/dashboard");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";
        toast.error(`Registration failed: ${errorMessage}`);
        console.error("Submission error:", error);
      }
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Register a New Service</h1>
        <p className="text-sm text-muted-foreground">
          Fill out the details below to add a new service to your profile.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
     
          <FormField
            control={form.control}
            name="serviceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Deep Tissue Massage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

       
          <FormField
            control={form.control}
            name="serviceDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the service in detail..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Service Price & Duration Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="servicePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Price ($)</FormLabel>
                  <FormControl>
                    {/* STEP 4: Remove the manual onChange handler. It is not needed. */}
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g., 75.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    {/* STEP 4: Remove the manual onChange handler. */}
                    <Input type="number" placeholder="e.g., 60" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Service Image URL Field */}
          <FormField
            control={form.control}
            name="serviceImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.png"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Registering..." : "Register Service"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ServiceRegistrationPage;
