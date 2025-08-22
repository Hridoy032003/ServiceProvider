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
  let selectedRole, userId;

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
    selectedRole = parsed.data.role;
    userId = parsed.data.userId;

    if (session.user.id !== userId) {
      throw new Error("Unauthorized: You can only update your own role.");
    }

    await db.user.update({
      where: { id: userId },
      data: { role: selectedRole },
    });

    revalidatePath("/", "layout");

  } catch (error) {
 

    console.error("Error in setUserRole action:", error);
    throw new Error("Failed to set user role.");
  }


  if (selectedRole === "customer") {
    redirect(`/customer/dashboard/${userId}`);
  } else if (selectedRole === "service_provider") {
    redirect(`/serviceProvider/dashboard/${userId}`);
  }
}