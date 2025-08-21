// Your BookingDashboard component
"use client";

import React, { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { updateBookingStatus } from "@/app/actions/serviceProvideAction/update-booking-status";
import { toast } from "react-toastify";

// STEP 1: Define the exact status type based on your Prisma Enum
type BookingStatus = "pending" | "confrimd" | "cancel";

// STEP 2: Update the main type to use the correct BookingStatus type
export type BookingWithDetails = {
  id: string;
  date: Date;
  slot: string;
  status: BookingStatus | null;
  user: {
    email: string | null;
  };
  service: {
    name: string;
  };
};

interface BookingDashboardProps {
  bookings: BookingWithDetails[];
}

const BookingDashboard = ({ bookings }: BookingDashboardProps) => {
  const [isPending, startTransition] = useTransition();

 
  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    startTransition(async () => {
    
      const result = await updateBookingStatus(bookingId, newStatus);

      if (result?.error) {
        toast.error(result.error);
      } else {
        window.location.reload();
        toast.success("Booking status updated!");
      }
     
    });
  };


   const getStatusColorClass = (status: BookingStatus | null) => {
     switch (status) {
       case "confrimd":
         return "bg-green-500"; 
       case "pending":
         return "bg-yellow-500"; 
       case "cancel":
         return "bg-red-500"; 
       default:
         return "bg-gray-400";
     }
   };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Bookings</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Email</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time Slot</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.user.email ?? "No email"}</TableCell>
              <TableCell>{booking.service.name}</TableCell>
              <TableCell>{booking.date.toLocaleDateString()}</TableCell>
              <TableCell>{booking.slot}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${getStatusColorClass(
                      booking.status
                    )}`}
                  />
                  <span>
                    {booking.status
                      ? booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)
                      : "Pending"}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      disabled={isPending || booking.status === "confrimd"}
                      onClick={() => handleStatusChange(booking.id, "confrimd")}
                    >
                      Confirm
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      disabled={isPending || booking.status === "cancel"}
                      onClick={() => handleStatusChange(booking.id, "cancel")}
                    >
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingDashboard;
