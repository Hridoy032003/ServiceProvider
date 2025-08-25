import React from "react";
import { format } from "date-fns";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingStatus } from "@prisma/client"; 
interface Booking {
  id: string;
  date: Date; 
  startTime: string;
  endTime: string;
  status: BookingStatus | null;
  service: {
    name: string;
  };
  user: {
    name: string | null;
  };
  serviceProvider: {
    businessName: string | null;
  };
}

interface BookingHistoryTableProps {
  bookings: Booking[];
}

const BookingHistoryTable = ({ bookings }: BookingHistoryTableProps) => {
  // Handle the empty state gracefully
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center p-10 border-2 border-dashed rounded-lg mt-6 bg-gray-50">
        <h3 className="text-xl font-medium text-gray-700">
          No Booking History
        </h3>
        <p className="text-gray-500 mt-2">
          Bookings you have made will appear here.
        </p>
      </div>
    );
  }


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
    <div className="border rounded-lg mt-6 overflow-x-auto mb-10">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold">Service</TableHead>
            <TableHead className="font-semibold">SurviceProvider</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Time Slot</TableHead>
            <TableHead className="font-semibold ">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-gray-50/50">
              <TableCell className="font-medium">
                {booking.service.name}
              </TableCell>
              <TableCell>{booking.serviceProvider.businessName}</TableCell>
              <TableCell>{format(new Date(booking.date), "PP")}</TableCell>{" "}
              <TableCell>{`${booking.startTime} - ${booking.endTime}`}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingHistoryTable;
