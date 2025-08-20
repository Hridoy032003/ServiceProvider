

"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/utils/db";

const bookingStatusSchema = z.enum(["pending", "confrimd", "cancel"]);

export async function updateBookingStatus(
  bookingId: string,
  newStatus: string
): Promise<{ success: boolean; error?: string }> {
  
  const validatedStatus = bookingStatusSchema.safeParse(newStatus);

  if (!validatedStatus.success) {
    return { success: false, error: "Invalid status provided." };
  }

  try {
    await db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: validatedStatus.data,
      },
    });

    
    revalidatePath("/dashboard"); 
    return { success: true };

  } catch (error) {
    console.error("Error updating booking status:", error);
    return {
      success: false,
      error: "Failed to update booking status.",
    };
  }
}