// lib/validators/service-validator.ts
import { z } from "zod";

export const serviceSchema = z.object({
  serviceName: z.string().min(1, { message: "Service name cannot be empty." }),
  serviceDescription: z
    .string()
    .min(1, { message: "Service description cannot be empty." }),
  servicePrice: z
    .coerce
    .number()
    .positive({ message: "Service price must be a positive number." }),
  serviceDuration: z
    .coerce
    .number()
    .int()
    .positive({ message: "Service duration must be a positive integer." }),
  serviceImage: z.string().min(1, { message: "A service image is required." }),
});

export type TServiceSchema = z.infer<typeof serviceSchema>;