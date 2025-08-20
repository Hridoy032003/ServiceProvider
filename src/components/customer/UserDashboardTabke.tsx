import React from "react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
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


const getStatusBadge = (status: Booking["status"]) => {
  if (typeof status === "string") {
    const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

    return <Badge>{capitalizedStatus}</Badge>;
  } else {
    return <Badge>Unknown Status</Badge>;
  }
};

  return (
    <div className="border rounded-lg mt-6 overflow-x-auto">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold">Service</TableHead>
            <TableHead className="font-semibold">Customer</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Time Slot</TableHead>
            <TableHead className="font-semibold text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-gray-50/50">
              <TableCell className="font-medium">
          
              </TableCell>
              
              <TableCell>{format(new Date(booking.date), "PP")}</TableCell>{" "}
          
              <TableCell>{`${booking.startTime} - ${booking.endTime}`}</TableCell>
              <TableCell className="text-right">
                {getStatusBadge(booking.status)}
              </TableCell>
            </TableRow>
          )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingHistoryTable;
