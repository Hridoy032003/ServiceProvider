// /components/BookingDashboard.tsx

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
// import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { updateBookingStatus } from "@/app/actions/serviceProvideAction/update-booking-status";
// import { updateBookingStatus } from "@/lib/actions/update-booking-status";

// Define the shape of the data we expect
// This should match the data you fetch with Prisma (including related user and service)
export type BookingWithDetails = {
  id: string;
  date: Date;
  slot: string;
  status: "pending" | "confrimd" | "cancel";
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

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    startTransition(async () => {
      await updateBookingStatus(bookingId, newStatus);
      
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confrimd":
        return "default";
      case "pending":
        return "secondary";
      case "cancel":
        return "destructive";

      default:
        return "default";
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
                <Badge variant={getStatusVariant(booking.status)}>
                  {booking.status}
                </Badge>
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
                      disabled={isPending}
                      onClick={() =>
                        handleStatusChange(booking.id, "CONFIRMED")
                      }
                    >
                      Confirm
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      disabled={isPending}
                      onClick={() =>
                        handleStatusChange(booking.id, "COMPLETED")
                      }
                    >
                      Mark as Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      disabled={isPending}
                      onClick={() => handleStatusChange(booking.id, "CANCELED")}
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
