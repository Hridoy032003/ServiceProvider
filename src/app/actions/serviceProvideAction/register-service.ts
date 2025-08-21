// app/actions/serviceProvideAction/register-service.ts
"use server";


import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/utils/db";
import { serviceSchema } from "@/lib/validetors/service-validator";


export async function registerService(formData: FormData) {
  const session = await getAuthSession();

  if (!session?.user) {
    throw new Error("You must be logged in to perform this action.");
  }

  const serviceProvider = await db.serviceProvider.findUnique({
    where: { userId: session.user.id },
  });

  if (!serviceProvider) {
    throw new Error(
      "Could not find a service provider profile for the current user."
    );
  }

  // Convert FormData to a plain object for parsing
  const data = Object.fromEntries(formData.entries());

  const parsedData = serviceSchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Zod Validation Failed:", parsedData.error.flatten());

    throw new Error(
      "Invalid form data provided. Please check your input."
    );
  }
  

  const priceInCents = Math.round(parsedData.data.servicePrice * 100);

  const service = await db.service.create({
    data: {
      name: parsedData.data.serviceName,
      description: parsedData.data.serviceDescription,
      price: priceInCents,
      durationInMinutes: parsedData.data.serviceDuration,
      serviceProviderId: serviceProvider.id,

    },
  });

  revalidatePath("/serviceProvider/serviceProviderRegister/services");

  return service;
}