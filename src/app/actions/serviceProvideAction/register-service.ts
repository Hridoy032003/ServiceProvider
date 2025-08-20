"use server"

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/utils/db";



const serviceSchema = z.object({
        serviceName: z.string().min(1, { message: "serviceName cannot be empty." }),
        serviceDescription: z.string().min(1, { message: "serviceDescription cannot be empty." }),
        servicePrice: z.coerce.number().positive({ message: "Service price must be a positive number." }),
        serviceDuration: z.coerce.number().int().positive({ message: "Service duration must be a positive integer." }),
        serviceImage: z.string().min(1, { message: "serviceImage cannot be empty." }),
    });


export async function registerService(formData: FormData) {
    const session = await getAuthSession();

    if (!session?.user) {
        // It's better to throw the error early if the user is not logged in.
        throw new Error("You must be logged in to perform this action.");
    }
   
    const serviceProvider = await db.serviceProvider.findUnique({ 
        where: { userId: session.user.id }
    });

    if (!serviceProvider) {
        throw new Error("Could not find a service provider profile for the current user.");
    }

    const data = {
        serviceName: formData.get('serviceName'),
        serviceDescription: formData.get('serviceDescription'),
        servicePrice: formData.get('servicePrice'),
        serviceDuration: formData.get('serviceDuration'),
        serviceImage: formData.get('serviceImage'),
    };
  
    const parsedData = serviceSchema.safeParse(data);

    if (!parsedData.success) {
      console.error("Zod Validation Failed:", parsedData.error);
      throw new Error("Invalid form data provided.");
    }
    
    const service = await db.service.create({
        data: {
            name: parsedData.data.serviceName,
            description: parsedData.data.serviceDescription,
            price: parsedData.data.servicePrice,
            durationInMinutes: parsedData.data.serviceDuration,
            
            // 3. THE FIX: Pass only the ID from the fetched object.
            serviceProviderId: serviceProvider.id,
        },
    });

    revalidatePath("/serviceProvider/serviceProviderRegister/services");

    // Note: toast() and redirect() may not work as expected together in server actions.
    // A redirect is often sufficient.
    // toast.success("Service registered successfully!");
    
    return service;
    // You might want to redirect the user after successful creation
    // redirect("/some-success-page");
}