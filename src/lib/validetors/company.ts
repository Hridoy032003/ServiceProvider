import { z } from "zod";

// This is the Zod schema that defines the shape and validation rules for your form data.
// It will be used by React Hook Form on the client-side for instant validation,
// and by your server action on the server-side to ensure data integrity.
export const companySchema = z.object({
  businessName: z
    .string()
    .min(1, { message: "Business name cannot be empty." }),
  contactEmail: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid phone number (at least 10 digits)." }),
  city: z
    .string()
    .min(1, { message: "City cannot be empty." }),
  state: z
    .string()
    .min(1, { message: "State cannot be empty." }),
  street: z
    .string()
    .min(1, { message: "Street cannot be empty." }),
  postalCode: z
    .string()
    .min(1, { message: "Postal code cannot be empty." }),
  country: z
    .string()
    .min(1, { message: "Country cannot be empty." }),
});


export type TCompanySchema = z.infer<typeof companySchema>;