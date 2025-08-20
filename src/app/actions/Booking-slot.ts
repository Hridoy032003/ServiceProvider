"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/utils/db";




const bookingSchema = z.object({
  slot: z.string().min(1, { message: "Slot cannot be empty." }),
  startTime: z.string().min(1, { message: "Start time cannot be empty." }),
  endTime: z.string().min(1, { message: "End time cannot be empty." }),
  date: z.date({ message: "Date is required." }),
  providerId: z.string().min(1, { message: "Provider ID cannot be empty." }),
  userId: z.string().min(1, { message: "User ID cannot be empty." }),
  serviceId: z.string().min(1, { message: "Service ID cannot be empty." }),
});

export async function createBooking(formData: FormData): Promise<{ success: boolean; error?: string; message?: string }> {
  const session = await getAuthSession();

  if (!session?.user) {
    return { success: false, error: "Authentication failed. Please sign in." };
  }

  try {
   
    const dateFromForm = formData.get("date") as string;
    const dataToValidate = {
      slot: formData.get("slot"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      date: new Date(dateFromForm),
      providerId: formData.get("providerId"),
      serviceId: formData.get("serviceId"),
      userId: session.user.id
    };

    const result = bookingSchema.safeParse(dataToValidate);

    if (!result.success) {
      return { success: false, error: `Invalid form data: ${result.error.message}` };
    }

    const { slot, startTime, endTime, date, providerId, serviceId } =
      result.data;

  
    const existingBooking = await db.booking.findFirst({
      where: {
        userId: session.user.id,
        serviceProviderId: providerId,
        startTime: startTime,

        date: date,
        status: {
          not: "cancel",
        },
       
    
  }})
    console.log(" existingBooking", existingBooking);

 
    if (existingBooking) {
    
      if (existingBooking.status === "pending" || existingBooking.status === "confrimd") {
        return { success: false, error: "This time slot is already booked or pending." };
      }
      
     
    }

    await db.booking.create({
      data: {
        slot,
        startTime,
        endTime,
        date,
        serviceProviderId: providerId,
        userId: session.user.id,
        serviceId,
        status: "pending", // Set default status for the new booking
      },
    });

    revalidatePath(`/`);

    return { success: true, message: "Booking was created successfully and is now pending!" };

  } catch (error) {
    console.error("Error creating booking:", error);
    
    return {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred."
    };
  }
}