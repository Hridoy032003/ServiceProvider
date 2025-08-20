"use server"

import { z } from "zod";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/utils/db";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";


const companySchema = z.object({
    businessName: z.string().min(1, { message: "businessName cannot be empty." }),
    contactEmail: z.string().email({ message: "Please enter a valid contactEmail address." }),
    phoneNumber: z.string().min(1, { message: "phoneNumber number cannot be empty." }),
    city: z.string().min(1, { message: "City cannot be empty." }),
    state: z.string().min(1, { message: "State cannot be empty." }),
    street: z.string().min(1, { message: "Street cannot be empty." }),
    postalCode: z.string().min(1, { message: "Postal Code cannot be empty." }),
    country: z.string().min(1, { message: "Country cannot be empty." }),
   
  });

  export async function registerCompany(formData: FormData) {
    const session = await getAuthSession();
    const data = Object.fromEntries(formData) as unknown as z.infer<typeof companySchema>;
  
    try {
      companySchema.parse(data);
    } catch (error) {
      console.error("Zod Validation Failed:", error);
      throw new Error("Invalid form data provided.");
    }
    
    if (!session?.user) {
      throw new Error("You must be logged in to perform this action.");
    }
    if(!session.user.hasAccess){
      
      toast.error("Please pay For that service.");
      redirect(`suscribe/${session.user.id}`);
    }
  
    const company = await db.serviceProvider.create({
      data: {
        businessName: data.businessName,
        contactEmail: data.contactEmail,
        phoneNumber: data.phoneNumber,
        city: data.city,
        state: data.state,
        street: data.street,
        postalCode: data.postalCode,
        country: data.country,
        userId: session.user.id
      },
    });
  

  
    return company;
  }