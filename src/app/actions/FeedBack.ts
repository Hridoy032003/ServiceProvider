// app/actions.ts (or your preferred location)

"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/utils/db";
import { z } from "zod";


const feedbackSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  content: z.string().min(1, { message: "Message cannot be empty." }),
});

export async function submitFeedback(prevState: any, formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    content: formData.get("content"),
  };

 
  const validatedFields = feedbackSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check your input.",
    };
  }
  
  try {

    const session = await getAuthSession();


    await db.contectReview.create({
      data: {
        email: validatedFields.data.email,
        content: validatedFields.data.content,
        userId: session?.user?.id || undefined, 
      },
    });

    return { message: "Feedback submitted successfully!", errors: {} };

  } catch (error) {

    console.error("Feedback Submission Error:", error);
    

    return { message: "An error occurred on the server. Please try again.", errors: {} };
  }
}