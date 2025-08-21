// lib/validations/service.ts
import { z } from "zod";

export const serviceSchema = z.object({
  serviceName: z.string().min(1, "Service name cannot be empty."),
  serviceDescription: z.string().min(1, "Service description cannot be empty."),
  servicePrice: z.coerce
    .number()
    .positive("Service price must be a positive number.")
    .min(0.01, "Service price must be at least $0.01."),
    

  serviceDuration: z.coerce
    .number()
    .int("Duration must be a whole number.")
    .positive("Service duration must be a positive integer.")
    .min(1, "Service duration must be at least 1 minute."),
    

  serviceImage: z.string().url("Please enter a valid URL for the image."),
});

export type TServiceSchema = z.infer<typeof serviceSchema>;