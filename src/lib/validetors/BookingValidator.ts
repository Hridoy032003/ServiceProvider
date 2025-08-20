// import { db } from "@/utils/db";
// import { BookingStatus } from "@prisma/client"; // Import the enum 
// export const BookingValidator = async (
//   userId: string,
//   providerId: string,
//   slot: string,
//   date: Date
// ): Promise<{ isValid: boolean; message: string }> => {
//   // Rule 1: A user cannot book their own service.
//   if (userId === providerId) {
//     return {
//       isValid: false,
//       message: "Service providers cannot book their own services.",
//     };
//   }
//   const existingBooking = await db.booking.findFirst({
//     where: {
//       userId: userId,
//       serviceProviderId: providerId,
//       slot: slot,
//       date: date, 
//       status: {
//         not: BookingStatus.cancel,
//       },
//     },
//   });

  
//   if (existingBooking) {
//     return {
//       isValid: false,
//       message: "You already have a booking for this date and time slot.",
//     };
//   }

 
//     isValid: true,
//     message: "Slot is available.",
//   };
// };