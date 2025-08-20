"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/utils/db";


const roleSchema = z.object({
  role: z.enum(["customer", "service_provider"]),
  userId: z.string().min(1, { message: "User ID cannot be empty." }),
});

export async function setUserRole(formData: FormData) {


  try {
    const session = await getAuthSession();
    if (!session?.user) {
      throw new Error("You must be logged in to perform this action.");
    }

    const parsed = roleSchema.safeParse({
      role: formData.get("role"),
      userId: formData.get("userId"),
    });
    

    if (!parsed.success) {
      console.error("Zod Validation Failed:", parsed.error.flatten());
      throw new Error("Invalid form data provided.");
    }

    const { role: selectedRole, userId } = parsed.data;

  
    if (session.user.id !== userId) {
      throw new Error("Unauthorized: You can only update your own role.");
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
       
        role: selectedRole,
      },
    });

    revalidatePath("/", "layout");

    if (selectedRole === "service_provider") {
      redirect(`/serviceProvider/dashboard/${session.user.id}`);
    } else {
      redirect(`/customer/dashboard/${session.user.id}`);
    }

  } catch (error) {
   
    console.error("Full error in setUserRole action:", error);
    
    
    throw error;
  }
}